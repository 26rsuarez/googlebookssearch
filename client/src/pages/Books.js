import React, {useState, useEffect} from "react";
import {Col, Row, Container } from "../components/Grid";
import API from "../utils/API"
import { Input, FormBtn} from "../components/Form"
import { List, ListItem } from "../components/List";
import DeleteBtn from "../components/DeleteBtn";
import { Link } from "react-router-dom";

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

    //this function will save the book to the database
    function saveBook(id){
        //the data from the book is returned from the booksFound state
        const bookData = booksFound.filter(book=>book.id===id)
        API.saveBook({
            title: bookData[0].volumeInfo.title,
            authors: bookData[0].volumeInfo.authors,
            description: bookData[0].volumeInfo.description,
            image: bookData[0].volumeInfo.imageLinks.thumbnail,
            link: bookData[0].volumeInfo.infoLink
        })
        .then(res=>loadBooks())
        .catch(err=>console.log(err))
    }

    //delete a book from the database
    function deleteBook(id) {
        API.deleteBook(id)
          .then(res => loadBooks())
          .catch(err => console.log(err));
    }

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
                            
                            Search <i class="fas fa-book"></i>
                        </FormBtn>
                    </Row>
                    
                    <List>
                        {booksFound.map(book=>(
                            <ListItem key={book.id}>
                                <h4>{book.volumeInfo.title}</h4>
                                <h5>{book.volumeInfo.authors}</h5>
                                <p><a href={book.volumeInfo.infoLink}>Link to book</a></p>
                                <img alt="bookthumbnail" src={book.volumeInfo.imageLinks===undefined ? "http://via.placeholder.com/50x50": book.volumeInfo.imageLinks.thumbnail }/>
                                
                                <FormBtn onClick={()=>saveBook(book.id)}>
                                    Save Book
                                </FormBtn>
                            </ListItem>
                            ))}
                    </List>

                </Col>
                <Col size="md-8 sm-12">
                    Saved Books <i class="fas fa-book-reader"></i>
                    <List>
                        {books.map(book => (
                        <ListItem key={book._id}>
                            <Link to={"/books/" + book._id}>
                            <strong>
                                {book.title} by {book.authors}
                            </strong>
                            </Link>
                            <DeleteBtn onClick={() => deleteBook(book._id)} />
                        </ListItem>
                        ))}
                    </List>
                </Col>
            </Row>
            </Container>)
}

export default Books;