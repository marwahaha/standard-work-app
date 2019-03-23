import React, { Component } from 'react'
import { FilePond, File, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import * as Doka from './doka/doka.esm.min'
import './doka/doka.min.css'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginImageEdit from 'filepond-plugin-image-edit'
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import { connect } from 'react-redux'
import { addMediaToElement, addMediaToElementError } from '../../actions'

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageEdit,
  FilePondPluginImageTransform,
  FilePondPluginImageResize,
  FilePondPluginImageValidateSize,
  FilePondPluginFileValidateType
)

class ImageUpload extends Component {
  state = {
    files: []
  }

  async componentDidMount() {
    const { element } = this.props
    if (element.media) {
      const imageBlob = await fetch(
        element.media.image_standard.media_src_url
      ).then(response => response.blob())
      this.pond.addFile(imageBlob)
    }
  }

  handleInit() {
    // console.log(this)
  }

  render() {
    const { element, addMediaToElement, addMediaToElementError } = this.props
    const apiUrl = process.env.REACT_APP_API_URL
    return (
      <FilePond
        imageCropAspectRatio="4:3"
        imageEditEditor={Doka.create({
          cropAspectRatioOptions: [
            {
              label: '4:3',
              value: 1.33
            }
          ]
        })}
        instantUpload={false}
        labelIdle={
          'Drop image or <span class="filepond--label-action"> Browse </span>'
        }
        acceptedFileTypes={['image/png', 'image/jpeg']}
        ref={ref => (this.pond = ref)}
        allowMultiple={false}
        server={{
          process: {
            url: apiUrl,
            ondata: formData => {
              formData.append('data_source', 'standard_work')
              formData.append('request_type', 'add_media_to_element')
              formData.append('ajea_id', element.id)
              formData.append('user_id', '1') // USER ID HERE
              return formData
            },
            onerror: formData => {
              console.log(formData)
              addMediaToElementError(formData)
              alert(formData)
            },
            onload: async formData => {
              const parsed = JSON.parse(formData)
              console.log(parsed)
              addMediaToElement(parsed)
            }
          },
          revert: null,
          fetch: null
        }}
        oninit={() => this.handleInit()}
        onaddfilestart={file => console.log(file)}
        onupdatefiles={fileItems => {
          this.setState({
            files: fileItems.map(fileItem => fileItem.file)
          })
        }}
      >
        {/* Update current files  */}
        {this.state.files.map(file => (
          <File key={file} src={file} origin="local" />
        ))}
      </FilePond>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    addMediaToElement: fields => dispatch(addMediaToElement(fields)),
    addMediaToElementError: fields => dispatch(addMediaToElementError(fields))
  })
)(ImageUpload)
