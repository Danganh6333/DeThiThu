import React, { useState, useCallback } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { updateXeMayApi } from '../Redux/actions/XeMayAction';

const UpdateModal = ({ visible, item, onUpdate, onClose }) => {
    const [tenXe, setTenXe] = useState(item ? item.ten_xe_ph33497 : '');
    const [mauSac, setMauSac] = useState(item ? item.mau_sac_ph33497 : '');
    const [moTa, setMoTa] = useState(item ? item.mo_ta_ph33497 : '');
    const [giaBan, setGiaBan] = useState(item ? item.gia_ban_ph33497.toString() : '');
    const [hinhAnh, setHinhAnh] = useState(item ? item.hinh_anh_ph33497 : '');
    const dispatch = useDispatch()
    const chooseImage = useCallback(() => {
        let options = {
            mediaType: 'photo',
            selectionLimit: 1,
            includeBase64: true
        };

        ImagePicker.launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User canceled image picker');
            } else if (response.errorCode) {
                console.log(response.errorCode, "Error");
            } else {
                setHinhAnh(`data:image/jpeg;base64,${response.assets[0].base64}`);
            }
        });
    }, []);

    const handleUpdate = () => {
        const updatedItem = {
            ten_xe_ph33497: tenXe,
            mau_sac_ph33497: mauSac,
            mo_ta_ph33497: moTa,
            gia_ban_ph33497: giaBan,
            hinh_anh_ph33497:hinhAnh
        };
        dispatch(updateXeMayApi({ id: item.id, data: updatedItem }))
            .then(result => {
                console.log('Update Xe máy thành công');
                setTenXe('')
                setMauSac('')
                setHinhAnh('')
                setGiaBan('')
                setMoTa('')
                onUpdate(updatedItem);
                onClose();
            }).catch(error => {
                console.log('Lỗi cập nhật chi tiêu', error);
            });

    };

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.container}>
                <Text style={styles.title}>Update Item</Text>
                <TouchableOpacity onPress={chooseImage}>
                    <Text style={styles.updateImageButton}>Update Image</Text>
                </TouchableOpacity>
                <Image source={{ uri: hinhAnh }} style={styles.image} />
                <TextInput
                    style={styles.input}
                    placeholder="Tên Xe"
                    value={tenXe}
                    onChangeText={text => setTenXe(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Màu Sắc"
                    value={mauSac}
                    onChangeText={text => setMauSac(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mô Tả"
                    value={moTa}
                    onChangeText={text => setMoTa(text)}
                    multiline
                />
                <TextInput
                    style={styles.input}
                    placeholder="Giá Bán"
                    value={giaBan}
                    onChangeText={text => setGiaBan(parseFloat(text))}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                    <Text style={styles.updateButtonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    updateButton: {
        backgroundColor: 'blue',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    updateButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: 'red',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    updateImageButton: {
        color: 'blue',
        marginBottom: 10,
    },
});

export default UpdateModal;
