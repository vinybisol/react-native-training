import { View, Text, StyleSheet, FlatList, Modal } from "react-native";
import CustomerHook from "../../hooks/customers/customer-hook";
import { useEffect, useState } from "react";
import ICustomerInterface from "../../model/customers/customer-interface";
import CustomerItemView from "./customer-item-view";
import CustomerModal from "../../modal/customer-modal";

export default function CustomerListView() {
    const { getCustomerAsync } = CustomerHook();

    const [listOfCustomer, setCustomers] = useState<ICustomerInterface[]>([]);
    const [modalVisible, setModalVisibel] = useState(false)
    const [selectedCustomer, setSelectedCustomer] = useState<ICustomerInterface>()


    useEffect(() => {
        const fecthData = async () => {
            const data = await getCustomerAsync();
            setCustomers(data);
        }
        fecthData();
    });

    function openModal(customer: ICustomerInterface) {
        setSelectedCustomer(customer)
        setModalVisibel(true)
    }


    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
                data={listOfCustomer}
                renderItem={({ item }) =>
                    <CustomerItemView customer={item} openModal={openModal} />
                }
            />

            <View>
                <Modal
                    animationType='fade'
                    visible={modalVisible}
                    onRequestClose={() => setModalVisibel(false)}
                >
                    <CustomerModal customer={selectedCustomer} />
                </Modal>
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
});