import { View, Text, StyleSheet, Pressable, GestureResponderEvent } from "react-native";


export default function CustomerItemView({ customer, openModal, deleteCustomer }: any) {
    function onPressCustomer(event: GestureResponderEvent): void {
        openModal(customer)
    }
    function onDeleteCustomer(event: GestureResponderEvent): void {
        deleteCustomer(customer)
    }

    return (
        <View >
            <Pressable
                onPress={onPressCustomer}
                onLongPress={onDeleteCustomer}>
                <Text style={styles.title}>{customer.name}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 48,
        fontFamily: 'Roboto',
    }
});