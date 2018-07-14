import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class CreateVideoForm extends React.Component {
  constructor(props) {
    debugger
    super(props);
    this.state = {

      // check if props include currentUserId
      title: '',
      description: '',
      video_url: 'dummy',
      thumbnail_url: 'dummy',
      uploader_id: this.props.currentUserId,
      thumbnailFile: null,
      thumbnailUrl: null,
      filmFile: null,
      filmUrl: null

    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const formProcessor = this.props.processForm;
    const errorDispatcher = this.props.dispatchErrors
    // this.props.processForm(user)//.then( () => {this.props.history.push('/');});
    const formData = new FormData();
    formData.append('video[title]', this.state.title);
    formData.append('video[description]', this.state.description);
    formData.append('video[video_url]', this.state.video_url);
    formData.append('video[thumbnail_url]', this.state.thumbnail_url);
    formData.append('video[uploader_id]', this.state.uploader_id)
    if (this.state.thumbnailFile) {
      formData.append('video[thumbnail_image]', this.state.thumbnailFile);
    }
    if (this.state.filmFile) {
      formData.append('video[film]', this.state.filmFile);
    }

    // const email = this.state.email;
    // const password = this.state.password;
    const that = this;
    $.ajax({
      url: '/api/videos',
      method: 'POST',
      data: formData,
      contentType: false,
      processData: false
    }).then(
        response => {
          that;
          that.props.history.push(`/videos/${response.id}`)
          // const user = {email: email, password: password};
          // formProcessor(user);
        },
        response => errorDispatcher(response.responseJSON)
      );

  }

  handleFile(field) {
    return e => {
      const file = e.currentTarget.files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = () => {

        this.setState({
          [`${field}File`]: file,
          [`${field}Url`]: fileReader.result
        });
      };

      if (file) {
        fileReader.readAsDataURL(file);
      }
    }
  }

  update(field) {
    return e => {
      return this.setState({[field]: e.currentTarget.value});
    } ;
  }

  renderErrors() {
    return(
      <ul className="session-errors">
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  clearErrors() {
    if (this.props.errors.length > 0) {
      this.props.clearErrors();
    }
  }

  componentWillMount() {
    if (this.state.uploader_id === null) {
      debugger
      this.props.history.push('/login');
    }
  }

  render() {
    console.log(this.state);
    const thumbnailPreview = this.state.thumbnailUrl ? <img width='60px' height="60px" src={this.state.thumbnailUrl} /> : null;
    const filmPreview = this.state.filmUrl ? <video width="200px" height="120px" src={this.state.filmUrl} /> : null;

    return (
      <div>
        <form onClick={this.clearErrors.bind(this)} onSubmit={this.handleSubmit}>

          <br/>
          {this.renderErrors()}
          <label>Title
            <input type="text"
              value={this.state.title}
              onChange={this.update('title')} />
          </label>
          <br/>
          <label>Description
            <textarea value={this.state.description}
              onChange={this.update('description')}/>
          </label>
          <br/>

          <div className="create-video-thumbnail-upload">

            <label>Thumbnail Upload
              <input type="file"
                onChange={this.handleFile('thumbnail')}/>
            </label>
            {thumbnailPreview}
          </div>

          <div className="create-video-film-upload">

            <label>Video Upload
              <input type="file"
                onChange={this.handleFile('film')}/>
            </label>
            {filmPreview}
          </div>

          <input type="submit" value={this.props.formType}/>
        </form>
      </div>
    );
  }
}

export default withRouter(CreateVideoForm);
