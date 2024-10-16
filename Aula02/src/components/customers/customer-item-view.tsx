import { View, Text, StyleSheet, Pressable, GestureResponderEvent } from "react-native";


export default function CustomerItemView({ customer }: any) {
    function onPressCustomer(event: GestureResponderEvent): void {
        console.log('pressionei algum na listagem');
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={onPressCustomer}>
                <Text style={styles.title}>{customer.name} {customer.lastName}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    title: {
        fontSize: 28
    }
});