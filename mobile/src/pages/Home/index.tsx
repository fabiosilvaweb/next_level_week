import React, { useState, useEffect } from 'react';
import { Feather as Icon } from "@expo/vector-icons";
import { View, ImageBackground, StyleSheet, Image, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

import RNPickerSelect from 'react-native-picker-select';

interface IBGEResponse {
  sigla: string,
  nome: string
}
interface select {
  value: string,
  label: string
}

interface select {
  value: string,
  label: string
}

interface IBGECityResponse {
  nome: string
}

const Home = () => {
  const [itemsUf, setItemsUf] = useState<select[]>([]);
  const [itemsCities, setItemsCities] = useState<select[]>([]);
  const [uf, setUf] = useState("");
  const [city, setCity] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    axios.get<IBGEResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => ({ value: uf.sigla, label: uf.nome }));

      setItemsUf(ufInitials);
    })
  }, [])

  useEffect(() => {
    if (uf === '0') {
      return;
    }

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`).then(response => {
      const cityNames = response.data.map(uf => ({ label: uf.nome, value: uf.nome }));

      setItemsCities(cityNames);
    })

  }, [uf])

  function handleNavigationToPoins() {
    navigation.navigate('Points', {
      uf,
      city
    });
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground
        style={styles.container}
        source={require('../../assets/home-background.png')}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={(value) => setUf(value)}
            placeholder={{ label: 'Selecione a UF', value: null, color: "#888" }}
            items={itemsUf}
            useNativeAndroidPickerStyle={false}
            Icon={() => {
              return <Icon name="chevron-down" size={20} color="#d6d6d6" />;
            }}
          />
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={(value) => setCity(value)}
            placeholder={{ label: 'Selecione a cidade', value: null, color: "#888" }}
            items={itemsCities}
            useNativeAndroidPickerStyle={false}
            Icon={() => {
              return <Icon name="chevron-down" size={20} color="#d6d6d6" />;
            }}
          />

          <RectButton style={styles.button} onPress={handleNavigationToPoins}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#fff" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>
              Entrar
          </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    paddingVertical: 8,
    paddingRight: 30,
    color: "#888",
  },
  inputAndroid: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    paddingVertical: 8,
    paddingRight: 30,
    color: "#888",
  },
  iconContainer: {
    top: 20,
    right: 15,
  },
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home;