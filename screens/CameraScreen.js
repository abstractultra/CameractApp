import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {useEffect, useState} from 'react';
import { Camera } from 'expo-camera';
import { BlurView } from 'expo-blur';

export default function CameraScreen() {
	const [hasPermission, setHasPermission] = useState(null);

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
					style={{ height: '100%', width: '100%' }}
					type={Camera.Constants.Type.front}
				>
					<View
						style={{
							flex: 1,
							backgroundColor: 'transparent',
							flexDirection: 'row',
						}}>
					</View>
				</Camera>

				<BlurView intensity={100} style={[StyleSheet.absoluteFill, styles.nonBlurredContent]} />
			</View>
		</View>
	);

	return (
		<View style={{ flex: 1 }}>
			<Camera style={{ flex: 1 }} type={Camera.Constants.Type.front}>
				<View
					style={{
						flex: 1,
						backgroundColor: 'transparent',
						flexDirection: 'row',
					}}>
				</View>
			</Camera>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	blurredImage: {
		width: 192,
		height: 192,
	},
	nonBlurredContent: {
		alignItems: 'center',
		justifyContent: 'center',
	},
});
