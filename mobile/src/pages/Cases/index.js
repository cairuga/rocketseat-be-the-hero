import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import api from '../../services/api';

export default function Cases() {
    const navigation = useNavigation();
    const [cases, setCases] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigateToDetail(caso) {
        navigation.navigate('Detail', {caso});
    }

    async function loadCases() {
        if (loading) {
            return;
        }

        if (total > 0 && cases.length == total) {
            return;
        }

        setLoading(true);

        const response = await api.get('casos', {
            params : { page }
        });
        setCases([... cases, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }
    useEffect(()=>{
        loadCases();
    }, [])

    return (
        <View style={styles.containter}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>

            <FlatList 
                data={cases}
                style={styles.caseList}
                showsVerticalScrollIndicator="false" 
                keyExtractor={caso => String(caso.id)}
                onEndReached={loadCases}
                onEndReachedThreshold={0.2}
                renderItem={({item: caso})=>(
                    <View style={styles.case}>
                        <Text style={styles.caseProperty}>ONG: </Text>
                        <Text style={styles.caseValue}>{caso.nome}</Text>

                        <Text style={styles.caseProperty}>Caso: </Text>
                        <Text style={styles.caseValue}>{caso.titulo}</Text>

                        <Text style={styles.caseProperty}>Valor: </Text>
                        <Text style={styles.caseValue}>
                            {Intl.NumberFormat('pt-br', {style: 'currency',  currency:'BRL'}).format(caso.valor)}
                        </Text>

                        <TouchableOpacity 
                            style={styles.detailButton}
                            onPress = {() => navigateToDetail(caso)}
                        >
                            <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                )}            
            />
        </View>
    );

}