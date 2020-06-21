const ButtonConstants = {
  cameraButtonSize: 80,
  cameraButtonBorderSize: 10,
  cameraButtonInnerMargin: 5,
  innerCameraButtonActiveScale: 0.4
};

ButtonConstants.innerCameraButtonSize =
  ButtonConstants.cameraButtonSize -
  ButtonConstants.cameraButtonBorderSize -
  ButtonConstants.cameraButtonInnerMargin * 2;

ButtonConstants.innerCameraButtonActiveSize =
  ButtonConstants.cameraButtonSize *
  ButtonConstants.innerCameraButtonActiveScale;

export default ButtonConstants;
