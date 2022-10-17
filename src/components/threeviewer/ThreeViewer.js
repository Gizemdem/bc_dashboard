import "./threeviewer.scss";
import { IfcViewerAPI} from 'web-ifc-viewer';
import React from 'react';
import { Color } from 'three';
import Dropzone from 'react-dropzone';
import { Backdrop, CircularProgress, IconButton } from '@mui/material';


class ThreeViewer extends React.Component {

    state = { 
        loaded: false,
        loading_ifc: false
    };
    constructor (props) {
        super(props);
        this.dropzoneRef = React.createRef();
    }

    componentDidMount() {
        const bgcolor = new Color('#e5e5e5');
        const container = document.getElementById('viewer-container');
        
        const viewer = new IfcViewerAPI({container, backgroundColor:bgcolor});
        viewer.addAxes();
        viewer.addGrid();
        viewer.IFC.setWasmPath('../../');


    //     this.viewer = viewer;

    //     window.ondblclick = viewer.addClippingPlane;
    //     window.onmousemove = viewer.IFC.prePickIfcItem;
    //     window.onmousedown = viewer.IFC.pickIfcItem;
        
    // }

    // onPickItem = async (event) => {
    //     const picked = await this.viewer.IFC.pickIfcItem();
    //     // ToDo: Create a React component and place the return of picked into it 
    //     if (picked !== null)
    //     {
    //         let id = picked.id;
    //         console.log(id);
    //     }
    // }

    onDrop = async (files) => {
        this.setState({ loading_ifc: true })
        await this.viewer.IFC.loadIfc(files[0], true);
        this.setState({ loaded: true, loading_ifc: false })
    };

    handleToggleClipping = () => {
        this.viewer.clipper.active = !this.viewer.clipper.active;
    };

    handleClickOpen = () => {
        this.dropzoneRef.current.open();
    };

    handleOpenBcfDialog = () => {
        this.setState({
            ...this.state,
            bcfDialogOpen: true
        });
    };

    handleCloseBcfDialog = () => {
        this.setState({
            ...this.state,
            bcfDialogOpen: false
        });
    };

    handleOpenViewpoint = (viewpoint) => {
        this.viewer.currentViewpoint = viewpoint;
    };

    handleOpenCollaborationDialog = () => {
        this.setState({
            ...this.state,
            collaborationDialogOpen: true
        });
    };

    handleCloseCollaborationDialog =() =>{
        this.setState({
            ...this.state,
            collaborationDialogOpen: false
        });
    }

    render() {
        return (
          <>
              
              {/* add to IconButton */}
              <div id='viewer-container' className="threeviewer" >
                
                  {/* <Dropzone ref={this.dropzoneRef} onDrop={this.onDrop}>
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                        </div>
                      )}
                  </Dropzone> */}
                  {/* {this.props.handleClickOpen} */}
                 
              </div>
              {/* <Backdrop
                // style={{
                //     zIndex: 100,
                //     display: "flex",
                //     alignItems: "center",
                //     alignContent: "center"
                // }}
                // open={this.state.loading_ifc}
              >
                  <CircularProgress/>
              </Backdrop> */}

          </>
        );
    }   
}

export default ThreeViewer;