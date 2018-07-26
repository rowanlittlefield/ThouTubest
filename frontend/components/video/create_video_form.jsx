import React from 'react';
import { withRouter } from 'react-router-dom';

class CreateVideoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      video_url: 'dummy',
      thumbnail_url: 'dummy',
      uploader_id: this.props.currentUserId,
      thumbnailFile: null,
      thumbnailUrl: null,
      filmFile: null,
      filmUrl: null,
      showFilmUploadMessage: false

    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const formProcessor = this.props.processForm;
    const errorDispatcher = this.props.dispatchErrors
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

    const that = this;
    $.ajax({
      url: '/api/videos',
      method: 'POST',
      data: formData,
      contentType: false,
      processData: false
    }).then(
        response => {
          that.props.history.push(`/videos/${response.id}`)
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
        }, () => {
          const filmFile = this.state.filmFile;
          if (filmFile === file) {
            if (filmFile.name.slice(filmFile.name.length - 4) === '.mov') {
              this.setState({showFilmUploadMessage: true});
            } else {
              this.setState({showFilmUploadMessage: false});
            }
          }
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
    if (!this.props.currentUserId) {
      this.props.history.push('/login');
    }
  }

  thumbnailPreview() {
    if (this.state.thumbnailUrl) {
      return (<img width='95px' height="95px" src={this.state.thumbnailUrl} />);
    } else {
      return (<div className="create-video-thumbnail-preview" width='60px' height="60px">
      <span>Thumbnail</span> <span>Preview</span>
      </div>);
    }
  }

  filmPreview() {
    if (this.state.showFilmUploadMessage) {
      return (<div className="create-video-film-preview-success" width='200px' height="200px">
      <span>Video Successfully uploaded!</span> <span>No Preview is available</span>
      </div>);
    }
    if (this.state.filmUrl) {

      return (
        <div className="create-video-film-preview-div">
          <video id="video" width='340px' height="300px" src={this.state.filmUrl}
             onTimeUpdate={(eve) => {
               const video = eve.target
               let value = 0;
               if (video.currentTime >= 8) {
                 video.currentTime = 0;
                 video.pause();
                    }
                  }
                }/>
          <div className={"create-video-film-preview-play-icon"} onClick={() => {
              const video = document.getElementById("video");
              (video.paused || video.ended) ? video.play() : video.pause();
              }
            }></div>
        </div>
      );
    } else {
      return (<div className="create-video-film-preview" width='200px' height="200px">
      <span>Video</span> <span>Preview</span>
      </div>);
    }
  }

  render() {

    return (
      <div>
        <form className="create-video-form" onClick={this.clearErrors.bind(this)} onSubmit={this.handleSubmit}>

          <br/>
          <div className="create-video-right-col">
            <div className="create-video-title-box">
              <label>Title
                <input type="text"
                  value={this.state.title}
                  onChange={this.update('title')} />
              </label>
              <br/>
            </div>
            <div className="create-video-description-box">
              <label>Description
                <textarea value={this.state.description}
                  onChange={this.update('description')}/>
              </label>
            </div>

            <div className="create-video-thumbnail-upload">
              <label className="create-video-thumbnail-label">Thumbnail Upload
                <input type="file"
                  onChange={this.handleFile('thumbnail')}
                  className="create-video-thumbnail-input"/>
              </label>
              <img className="create-video-thumbnail-icon" src={window.uploadFileIcon} width="60px" height="60px"/>
              {this.thumbnailPreview()}
            </div>
            <br/>

          </div>

          <div className="create-video-left-col">
            <div className="create-video-film-upload">
              <label className="create-video-film-upload-label">Video Upload
                <div className="create-video-film-input-adjust">
                  <input type="file"
                    className="create-video-film-input"
                    onChange={this.handleFile('film')}/>
                </div>
              </label>
              <img className="create-video-film-icon" src={window.uploadFileIcon} width="60px" height="60px"/>
              {this.filmPreview()}
              <input className="create-video-submit" type="submit" value="next"/>
              {this.renderErrors()}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(CreateVideoForm);
