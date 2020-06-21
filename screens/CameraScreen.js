import * as React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Animated,
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import { Camera } from 'expo-camera';
import { BlurView } from 'expo-blur';
import ButtonConstants from '../constants/Buttons';

export default function CameraScreen() {
	const [hasPermission, setHasPermission] = useState(null);
	const scaleAnimation = useRef(new Animated.Value(1)).current;
	const cameraRef = useRef(null);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.container}>
				<Camera
					style={styles.camera}
					type={Camera.Constants.Type.front}
					ref={cameraRef}
				>
				</Camera>
				<TouchableWithoutFeedback
					onPressIn={() => {
						Animated.spring(scaleAnimation, {
							toValue: 0.8,
							tension: 10,
							friction: 5,
							useNativeDriver: false
						}).start();
					}}
					onPressOut={() => {
						Animated.spring(scaleAnimation, {
							toValue: 1,
							tension: 10,
							friction: 5,
							useNativeDriver: false
						}).start();
					}}
					onPress={async () => {
						let { uri } = await cameraRef.current.takePictureAsync();
						let formData = new FormData();
						formData.append('image', {
							uri,
							type: 'image/jpg',
							name: 'picture.jpg'
						});
						const response = await fetch('https://clear-backend.herokuapp.com/getMood', {
							method: 'post',
							headers: {
								'Content-Type': 'multipart/form-data',
							},
							body: formData
						});
						const result = await response.json();
						console.log(result);

					}}
				>
					<View style={styles.outerPhotoButton}>
						<Animated.View
							style={[
								styles.innerPhotoButton,
								{
									transform: [{ scale: scaleAnimation }]
								}
							]}
						/>
					</View>
				</TouchableWithoutFeedback>

				<BlurView intensity={100} style={styles.blur} />
				<BlurView intensity={100} style={styles.blur} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		position: 'relative'
	},
	camera: {
		...StyleSheet.absoluteFill,
		zIndex: -2,
	},
	blur: {
		...StyleSheet.absoluteFill,
		zIndex: -1
	},
	outerPhotoButton: {
		flex: -1,
		height: ButtonConstants.cameraButtonSize,
		width: ButtonConstants.cameraButtonSize,
		borderRadius: ButtonConstants.cameraButtonSize / 2,
		color: 'rgba(0, 0, 0, 0)',
		borderWidth: 5,
		borderColor: 'white',
		borderStyle: 'solid',
		alignItems: 'center',
		margin: 10,
		justifyContent: 'center'
	},
	innerPhotoButton: {
		height: ButtonConstants.innerCameraButtonSize,
		width: ButtonConstants.innerCameraButtonSize,
		borderRadius: ButtonConstants.innerCameraButtonSize / 2,
		backgroundColor: 'white'
	}
});
