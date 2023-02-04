import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
} from "react-native";
import Navbar from "../components/Navbar";
import BookCount from "../components/BookCount";
import CustomButton from "../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/colors";
import * as firebase from "firebase/app";
import { snapshotToArray } from "../../helpers/firebaseHelpers";
import ListItem from "../components/ListItem";
import * as Animatable from "react-native-animatable";

const Home = ({ route, navigation }) => {
  const [total, setTotal] = useState(0);
  const [reading, setReading] = useState(0);
  const [read, setRead] = useState(0);
  const [user, setUser] = useState({});
  const [book, setBook] = useState("");
  const [books, setBooks] = useState([]);
  const [booksReading, setBooksReading] = useState([]);
  const [booksRead, setBooksRead] = useState([]);
  const [addNewBookVisible, setAddNewBookVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    getCurrentUser();
  }, [books]);

  const getCurrentUser = async () => {
    const { user } = route.params;

    const currentUser = await firebase
      .database()
      .ref("users")
      .child(user.uid)
      .once("value");

    const books = await firebase
      .database()
      .ref("books")
      .child(user.uid)
      .once("value");
    const booksArray = snapshotToArray(books);

    setUser(currentUser.val());
    setBooks(booksArray);
    setBooksReading(booksArray.filter((book) => !book.read));
    setBooksRead(booksArray.filter((book) => book.read));
  };

  const addBook = async () => {
    setBook("");
    inputRef.current.setNativeProps({ text: "" });
    try {
      const snapshot = await firebase
        .database()
        .ref("books")
        .child(user.uid)
        .orderByChild("name")
        .equalTo(book)
        .once("value");

      if (snapshot.exists()) alert("Unable to add, book already exists!");

      const key = await firebase.database().ref("books").child(user.uid).push()
        .key;

      const response = await firebase
        .database()
        .ref("books")
        .child(user.uid)
        .child(key)
        .set({ name: book, read: false });

      setBooks([...books, { name: book.name, read: false }]);
      setBooksReading([...booksReading, { name: book.name, read: false }]);
    } catch (error) {
      console.log(error);
    }
  };

  const markAsRead = async (selectedBook, index) => {
    try {
      await firebase
        .database()
        .ref("books")
        .child(user.uid)
        .child(selectedBook.key)
        .update({ read: true });

      let booksList = books.map((book) => {
        if (book.name == selectedBook.name) {
          return { ...book, read: true };
        }

        return book;
      });
      let booksReadingList = booksReading.filter(
        (book) => book.name !== selectedBook.name
      );
      setBooks(booksList);
      setBooksReading(booksReadingList);
      setBooksRead((prevState) => [...prevState, ...booksRead, selectedBook]);
    } catch (error) {
      console.log(error);
    }
  };

  const renderBook = (item, index) => {
    return (
      <ListItem item={item}>
        {item.read ? (
          <Ionicons name="ios-checkmark" color={colors.logoColor} size={30} />
        ) : (
          <CustomButton
            onPress={() => markAsRead(item, index)}
            style={styles.markAsReadButton}
          >
            <Text style={styles.makedAsReadText}>Mark as read</Text>
          </CustomButton>
        )}
      </ListItem>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      {/* <Navbar /> */}
      {/* TEXT INPUT CONTAINER */}
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setBook(text)}
          style={styles.input}
          placeholder="Enter a book name"
          placeholderTextColor={colors.textPlaceholder}
          ref={inputRef}
        />
      </View>
      {/* TEXT INPIUT CONTAINER */}
      <FlatList
        data={books}
        renderItem={({ item }, index) => renderBook(item, index)}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <View style={styles.listContainer}>
            <Text style={styles.text}>
              Youre not reading any books right now :(
            </Text>
          </View>
        }
      />
      <View style={styles.container} />
      {/* BUTTON CONTAINER */}
      <View style={styles.container}>
        <Animatable.View
          animation={book.length > 0 ? "slideInRight" : "slideOutRight"}
        >
          <CustomButton
            onPress={() => addBook(book)}
            position="right"
            style={styles.addNewBookButton}
          >
            <Ionicons name="ios-add" color="white" size={40} />
          </CustomButton>
        </Animatable.View>
      </View>
      {/* BUTTON CONTAINER */}
      {/* <View style={styles.footer}>
        <BookCount title="Total" count={books.length} />
        <BookCount title="Reading" count={booksReading.length} />
        <BookCount title="Read" count={booksRead.length} />
      </View> */}
      <SafeAreaView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
  inputContainer: {
    height: 50,
    flexDirection: "row",
    margin: 5,
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    paddingLeft: 5,
    borderColor: colors.markedAsReadContainerBg,
    borderBottomWidth: 5,
    fontSize: 22,
    color: colors.txtWhite,
  },
  listContainer: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
  },
  addNewBookButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.bgPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  checkBookButton: {
    backgroundColor: colors.bgSuccess,
    color: "#FFFFFF",
  },
  hideInputButton: {
    backgroundColor: colors.bgError,
    color: "#FFFFFF",
  },
  makedAsReadContainer: {
    minHeight: 100,
    flexDirection: "row",
    backgroundColor: colors.markedAsReadContainerBg,
    alignItems: "center",
    marginVertical: 5,
  },
  makedAsReadItem: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 5,
  },
  listItemTitle: {
    fontWeight: "100",
    fontSize: 20,
    color: colors.txtWhite,
  },
  markAsReadButton: {
    width: 100,
    height: 50,
    backgroundColor: colors.bgSuccess,
    alignItems: "center",
    justifyContent: "center",
  },
  makedAsReadText: {
    fontWeight: "bold",
    color: "#FFF",
  },
  footer: {
    height: 70,
    borderTopWidth: 0.5,
    borderTopColor: colors.borderColor,
    flexDirection: "row",
  },
  imageContainer: {
    height: 70,
    width: 70,
    marginLeft: 10,
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    borderRadius: 35,
  },
});

export default Home;
