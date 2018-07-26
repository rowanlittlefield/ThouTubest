import React from 'react';
import { withRouter } from 'react-router-dom';
import { createVideo } from '../../../util/video_api_util';
import VideoFormPreviewStreamer from './video_form_preview_streamer';

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
    createVideo(formData).then(
        response => that.props.history.push(`/videos/${response.id}`),
        response => that.props.dispatchErrors(response.responseJSON)
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
      return (<VideoFormPreviewStreamer filmUrl={this.state.filmUrl}/>);
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
              <label className="create-video-thumbnail-label">Custom Thumbnail Upload <br/>
              <span className="create-video-thumbnail-label-subtitle">(optional)</span>
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
