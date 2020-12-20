import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    background: '#0072CE',
    color: 'white',
    textAlign: 'center',
    minWidth: '400px',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(0),
    top: theme.spacing(0),
    color: 'white',
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: '30px 7vw',
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    justifyContent: 'center'
  },
}))(MuiDialogActions);

export default function PopupComponent({ buttonLabel, modalTitle, btnClasses, btnStartIcon, content, btn1Label="Yes", btn2Label="No", btn1Func, btn2Func, btn1Classes, btn2Classes, reassignToVal="" }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen} className={btnClasses} startIcon={btnStartIcon}>
        {buttonLabel}
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {modalTitle}
        </DialogTitle>
        <DialogContent dividers>
          {content}
        </DialogContent>
        <DialogActions>
          <Button
            className={btn1Classes}
            status={buttonLabel} 
            autoFocus 
            color="primary"
            onClick={(event) =>{
                                  if(buttonLabel!=='Reassign') {
                                    if(btn1Func) btn1Func(event); handleClose();
                                  } else if( reassignToVal!==1) {
                                    if(btn1Func) btn1Func(event); handleClose();
                                  } else {
                                    window.alert("Please select the service provider.")
                                  }
                                }}
            > 
          {btn1Label}
          </Button>
          <Button className={btn2Classes} autoFocus onClick={(event) =>{if(btn2Func) btn2Func(event); handleClose();}} color="primary">
          {btn2Label}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
