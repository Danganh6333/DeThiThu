import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector  } from 'react-redux';
import { addXeMayApi } from '../Redux/actions/XeMayAction';

const Screen2 = () => {
  const [hinhAnh, setHinhAnh] = useState(null);
  const [tenXe, setTenXe] = useState('');
  const [mauSac, setMauSac] = useState('');
  const [moTa, setMoTa] = useState('');
  const [giaBan, setGiaBan] = useState('');
  const move = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const listXeMay = useSelector(state => state.listXeMay.listXeMay);
  console.log('Redux State:', listXeMay);
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


  const handleAddItem = () => {
    const duLieuThem = {
      id: Math.random().toString(),
      ten_xe_ph33497:tenXe,
      mau_sac_ph33497:mauSac,
      gia_ban_ph33497:giaBan,
      mo_ta_ph33497:moTa,
      hinh_anh_ph33497:hinhAnh,
    }
    dispatch(addXeMayApi(duLieuThem)).then(result =>{
      console.log('Thêm thành công');
      move.navigate('Screen1')
    }).catch(err =>{
      console.log("Lỗi thêm",err);
    })
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Item</Text>
      <TouchableOpacity style={styles.imageContainer} onPress={chooseImage}>
        {hinhAnh ? (
          <Image source={{ uri: hinhAnh }} style={styles.image} />
        ) : (
          <Text>Select Image</Text>
        )}
      </TouchableOpacity>
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
        onChangeText={text => setGiaBan(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
        <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
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
  addButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Screen2;
