import { ActivityIndicator, FlatList, Image, LogBox, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteXeMayApi, fetchXeMay } from '../Redux/actions/XeMayAction';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../Components/CustomButton';
import Banner from '../Components/Banner';
import UpdateModal from '../Components/UpdateModal';

const RenderItem = ({ item, handleDelete, handleUpdate }) => (
  <View style={styles.itemContainer}>
    <Image source={{ uri: item.hinh_anh_ph33497 }} style={styles.itemImage} />
    <View style={styles.itemDetails}>
      <Text style={styles.itemTitle}>{item.ten_xe_ph33497}</Text>
      <Text style={styles.itemDescription}>{item.mo_ta_ph33497}</Text>
      <Text style={styles.itemPrice}>Price: ${item.gia_ban_ph33497}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleUpdate(item)}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDelete(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);


const Screen1 = () => {
  const move = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    dispatch(fetchXeMay());
  }, [dispatch]);

  const listXeMay = useSelector(state => state.listXeMay.listXeMay);
  useEffect(() => {
    setLoading(false);
    setData(listXeMay);
  }, [listXeMay]);

  const handleUpdate = (item) => {
    setSelectedItem(item);
    console.log("Selected item:", item);
    setModalVisible(true);
  };

  const handleDelete = async id => {
    dispatch(deleteXeMayApi(id)).then(res => {
      console.log("Xóa thành công");
    }).catch(err => {
      console.log("Xóa thất bại", err);
    })
  };

  const uniqueData = data.reduce((acc, current) => {
    const x = acc.find(item => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  return (
    <View style={styles.container}>
      <Banner />
      <CustomButton title="Thêm" onPress={() => move.navigate('Screen2')} />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={uniqueData}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <RenderItem item={item} handleDelete={handleDelete} handleUpdate={handleUpdate} />}
        />
      )}
      {selectedItem && (
        <UpdateModal
          visible={modalVisible}
          item={selectedItem}
          onUpdate={() => {
            setModalVisible(false);
          }}
          onClose={() => {
            setModalVisible(false),
            setSelectedItem(null)
          }
          }
        />
      )}
    </View>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 16,
    marginTop: 5,
  },
  itemPrice: {
    fontSize: 16,
    marginTop: 5,
    color: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: 'blue',
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
