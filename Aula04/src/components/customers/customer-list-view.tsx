import { View, Text, StyleSheet, FlatList, Modal, Pressable, Alert } from "react-native";
import CustomerHook from "../../hooks/customers/customer-hook";
import { useEffect, useState } from "react";
import ICustomerInterface from "../../model/customers/customer-interface";
import CustomerItemView from "./customer-item-view";
import CustomerModal from "../../modal/customer-modal";

export default function CustomerListView() {
    const { getCustomerAsync, upsertCustomerAsync, deleteCustomerAsync } = CustomerHook();

    const [listOfCustomer, setListOfCustomer] = useState<ICustomerInterface[]>([]);
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedCustomer, setSelectedCustomer] = useState<ICustomerInterface>()


    useEffect(() => {
        const fecthData = async () => {
            await getCustomer();
        }
        fecthData();
    });

    function openModal(customer: ICustomerInterface) {
        setSelectedCustomer(customer)
        setModalVisible(true)
    }

    async function getCustomer() {
        const listOfPeople = await getCustomerAsync();
        setListOfCustomer(listOfPeople);
    }

    function saveCustomer(customer: ICustomerInterface) {
        const save = async () => {
            if (customer) {
                await upsertCustomerAsync(customer);
                setModalVisible(false);
                await getCustomer();
            }
        }
        save();
    }

    function deleteCustomer(customer: ICustomerInterface) {
        const del = async () => {
            await deleteCustomerAsync(customer);
            Alert.alert('Registro excluido')
            await getCustomer();
        }
        del();
    }

    function addCustomer() {
        setSelectedCustomer(undefined);
        setModalVisible(true);
    }


    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
                data={listOfCustomer}
                renderItem={({ item }) =>
                    <CustomerItemView customer={item} openModal={openModal} deleteCustomer={deleteCustomer} />
                }
            />

            <View>
                <Modal
                    animationType='fade'
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <CustomerModal customer={selectedCustomer} setModalVisible={setModalVisible} saveCustomer={saveCustomer} />
                </Modal>
            </View>

            <View style={styles.buttonAdd}>
                <Pressable onPress={() => addCustomer()}>
                    <Text>Adicionar</Text>
                </Pressable>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonAdd: {
        backgroundColor: 'gray',
        position: 'absolute',
        bottom: 30,
        right: 30,
        borderRadius: 50,
        padding: 10
    }
});