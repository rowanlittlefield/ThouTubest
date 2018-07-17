import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class UpdateVideoForm extends React.Component {
  constructor(props) {
    super(props);

    const video = this.props.video
    if (video) {
      this.state = {
        title: video.title,
        description: video.description,
        video_url: 'dummy',
        thumbnail_url: 'dummy',
        uploader_id: video.uploader_id,
        thumbnailFile: null,
        thumbnailUrl: video.thumbnail_image_url,
        filmUrl: video.film_url
      };
    } else {
      this.state = {
        title: '',
        description: '',
        video_url: 'dummy',
        thumbnail_url: 'dummy',
        uploader_id: null,
        thumbnailFile: null,
        thumbnailUrl: null,
        filmUrl: null,
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if(!this.props.currentUserId) {
      this.props.history.push('/login');
    }
    this.props.getVideo();
  }

  componentWillReceiveProps(nextProps) {
      const video = nextProps.video;

      this.setState({
        title: video.title,
        description: video.description,
        video_url: 'dummy',
        thumbnail_url: 'dummy',
        uploader_id: video.uploader_id,
        thumbnailFile: null,
        thumbnailUrl: video.thumbnail_image_url,
        filmUrl: video.film_url
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const formProcessor = this.props.processForm;
    const errorDispatcher = this.props.dispatchErrors
    const formData = new FormData();
    formData.append('video[title]', this.state.title);
    formData.append('video[description]', this.state.description);
    formData.append('video[thumbnail_url]', this.state.thumbnail_url);
    formData.append('video[uploader_id]', this.state.uploader_id)
    if (this.state.thumbnailFile) {
      formData.append('video[thumbnail_image]', this.state.thumbnailFile);
    }

    const that = this;
    $.ajax({
      url: `/api/videos/${that.props.video.id}`,
      method: 'PATCH',
      data: formData,
      contentType: false,
      processData: false
    }).then(
        response => {
          that;
          that.props.history.push(`/videos/${response.video.id}`)
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
    if (this.state.filmUrl) {
      return (<div className="create-video-film-preview-div">
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
      </div>);
    } else {
      return (<div className="create-video-film-preview" width='200px' height="200px">
      <span>Video</span> <span>Preview</span>
      </div>);
    }
  }

  render() {
    console.log(this.state);

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
              <label className="create-video-film-upload-label">Update Video Shown Below
              </label>
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

export default withRouter(UpdateVideoForm);

// <div className="create-video-film-input-adjust">
//   <input type="file"
//     className="create-video-film-input"
//     onChange={this.handleFile('film')}/>
// </div>
// <img className="create-video-film-icon" src={window.uploadFileIcon} width="60px" height="60px"/>
