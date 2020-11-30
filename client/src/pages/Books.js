import React, {useState, useEffect} from "react";
import {Col, Row, Container } from "../components/Grid";
import API from "../utils/API"
import { Input, FormBtn} from "../components/Form"
import { List, ListItem } from "../components/List";

//users will be able to search for 
function Books() {
    //the books state comes from our database
    //the search state comes from google books api
    const [books, setBooks] = useState([])
    const [bookSearch, setBookSearch] = useState({})
    const [booksFound, setBooksFound] = useState([])

    useEffect(()=>{
        loadBooks()
    }, [])

    //loads all books from the database and sets them to the books state
    function loadBooks(){
        API.getBooks()
           .then(res=> setBooks(res.data))
           .catch(err=> console.log(err))
    }

    //updates the component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setBookSearch({...bookSearch, [name]: value})
    };

    //this function will save the results from the search to be displayed temporarily
    function setUpBooks(res){
        setBooksFound(res.data.items)
    }
    

    //on submit the form will call the api to search for the book
    function handleFormSubmit(event) {
        event.preventDefault();
        if (bookSearch.title) {
            API.searchBook(bookSearch.title)
            .then(res => setUpBooks(res))
            .catch(err => console.log(err));
        }
    };

    return (<Container fluid>
            <Row>
                <Col size="md-4">
                    <Row>
                        <Input
                        onChange={handleInputChange}
                        name="title"
                        placeholder="Title of the book"
                        />
                        <FormBtn 
                        disabled={!bookSearch.title}
                        onClick={handleFormSubmit}
                        >
                            
                            Search
                        </FormBtn>
                    </Row>
                    
                    <List>
                        {booksFound.map(book=>(
                            <ListItem key={book.id}>
                                {book.volumeInfo.title}
                                {book.volumeInfo.authors}
                                {book.volumeInfo.imageLinks.thumbnail}
                                {book.volumeInfo.infoLink}
                            </ListItem>))}
                    </List>

                </Col>
                <Col size="md-8 sm-12">
                    Saved Books
                </Col>
            </Row>
            </Container>)
}

export default Books;