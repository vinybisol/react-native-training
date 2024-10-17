import { View, Text, StyleSheet, Pressable, GestureResponderEvent } from "react-native";


export default function CustomerItemView({ customer, openModal }: any) {
    function onPressCustomer(event: GestureResponderEvent): void {
        openModal(customer)
    }

    return (
        <View >
            <Pressable onPress={onPressCustomer}>
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