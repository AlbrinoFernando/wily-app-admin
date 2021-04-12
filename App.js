import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import React, { Component } from 'react';
import db from './Config';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      bookName: '',
      bookAuthor: '',
    };
  }

  addBook = async () => {
    if(this.state.bookName !== '' && this.state.bookAuthor !== ''){
      const list = await db.collection('books').get();
      var bookId = 1;
      list.docs.map((doc) => {
        bookId++;
      });

      if(bookId < 10){
        bookId = "00" + bookId
      }else if(bookId < 10){
        bookId = "0" + bookId
      }else{
        bookId = "" + bookId
      }

      bookId = "book" + bookId
      console.log(bookId)
      
      db.collection("books").doc(bookId).set({
        bookAvailability: true,
        bookDetails: {
          author: this.state.bookAuthor,
          title: this.state.bookName
        },
        bookId: bookId
      })

      Alert.alert(this.state.bookName + " by " + this.state.bookAuthor + "was successfully uploaded!")

      this.setState({
        bookAuthor: "",
        bookName: ""
      })
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Wily App Admin</Text>

        <TextInput
          onChangeText={(text) => {
            this.setState({
              bookName: text,
            });
          }}
          placeholder="Book Name"
          style={styles.textInput}
          value={this.state.bookName}
        />
        <TextInput
          onChangeText={(text) => {
            this.setState({
              bookAuthor: text,
            });
          }}
          placeholder="Book Author"
          style={styles.textInput}
          value={this.state.bookAuthor}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
             this.addBook();
          }}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 3,
    margin: 5,
    padding: 2.5,
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 26,
  },
});
