import React from 'react';
import { View, Image, TouchableOpacity, Text, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import logoImg from '../../assets/logo.png';
import styles from './styles';


export default function Detail() {
    const navigation = useNavigation();
    
    const route = useRoute();
    const caso = route.params.caso;
    
    const valor = Intl.NumberFormat('pt-br', {style: 'currency',  currency:'BRL'}).format(caso.valor);
    const message = `Olá ${caso.nome}, estou entrando em contato porque gostaria de ajudar no caso ${caso.titulo} com o valor de ${valor}.`;
    

    
    function navigateToCases() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso ${caso.titulo}`,
            recipients: [caso.email],
            body: message
        })

    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${caso.whatsapp}&text=${message}`);
    }

    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity 
                    style={styles.detailButton}
                    onPress = {navigateToCases}
                >
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>
            <View style={styles.case}>
                <Text style={[styles.caseProperty, {marginTop: 0}]}>ONG: </Text>
                <Text style={styles.caseValue}>{caso.nome} </Text>
                <Text style={styles.caseValueSmall}>{caso.cidade} / {caso.uf}</Text>

                <Text style={styles.caseProperty}>Caso: </Text>
                <Text style={styles.caseValue}>{caso.titulo}</Text>

                <Text style={styles.caseProperty}>Valor: </Text>
                <Text style={styles.caseValue}>
                    {Intl.NumberFormat('pt-br', {style: 'currency',  currency:'BRL'}).format(caso.valor)}
                </Text>             
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
                <Text style={styles.heroDescription}>Entre em contato:</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

}