import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import CustomermModel from '../model/customers/customer-model';

export default function CustomerModal({ customer, setModalVisible, saveCustomer }: any) {
    const [name, setName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [gender, setGender] = useState<string>('')
    const [birthDate, setBirthDate] = useState(new Date())


    const showDateTimePicker = () => {
        DateTimePickerAndroid.open({
            value: birthDate,
            onChange,
            mode: 'date',
        });
    };
    const onChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate
        if (currentDate)
            setBirthDate(currentDate)
    };

    function handlerSaveCustomer() {
        const newCustomer = new CustomermModel(
            customer?.id,
            name,
            lastName,
            birthDate,
            gender
        )
        saveCustomer(newCustomer)
    }


    useEffect(() => {
        if (customer) {
            setName(customer.name)
            setLastName(customer.lastName)
            setGender(customer.gender)
            setBirthDate(new Date(customer.birthDate))
        }
    }, [customer])

    return (
        <View style={styles.container}>
            <View style={styles.modalView}>
                <Text style={styles.modalTitle}>
                    Edição
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="nome"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    maxLength={30}
                    keyboardType="name-phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="sobrenome"
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                    maxLength={30}
                    keyboardType="name-phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="genero"
                    value={gender}
                    onChangeText={(text) => setGender(text.toUpperCase())}
                    maxLength={1}
                    keyboardType="name-phone-pad"
                />
                <Pressable
                    style={styles.input}
                    onPress={() => showDateTimePicker()}>
                    <Text>{birthDate?.toLocaleDateString()}</Text>
                </Pressable>
                <View style={styles.buttonArea}>
                    <Pressable style={[styles.button, styles.buttonSalvar]}
                        onPress={() => handlerSaveCustomer()}>
                        <Text style={styles.buttonText}>SALVAR</Text>
                    </Pressable>
                    <Pressable style={[styles.button, styles.buttonCancelar]}
                        onPress={() => setModalVisible(false)}>
                        <Text style={[styles.buttonText, { color: 'white' }]}>CANCELAR</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    modalView: {
        flex: 1,
        width: "100%",
        alignItems: 'center'

    },
    modalTitle: {
        marginTop: 50,
        fontSize: 36,
        marginBottom: 50
    },
    input: {
        borderColor: 'black',
        borderWidth: 2,
        width: "90%",
        height: 50,
        padding: 15,
        marginBottom: 20
    },
    buttonArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "90%",
        position: 'absolute',
        bottom: 10
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 2,
        height: 50,
        borderRadius: 5
    },
    buttonCancelar: {
        marginLeft: 5,
        backgroundColor: 'black',
    },
    buttonSalvar: {
        marginRight: 5,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'Roboto',
        fontWeight: 'bold'
    }
});