const books = [
    {
        id: 1,
        name: "Harry Potter and the Philosopher's Stone",
        author: 'J. K. Rowling',
        image: 'https://images-na.ssl-images-amazon.com/images/I/51ifu1aebKL._SX332_BO1,204,203,200_.jpg',
        plot: "The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry."
    }, {
        id: 2,
        name: 'It',
        author: 'Stephen King',
        image: 'https://images-na.ssl-images-amazon.com/images/I/41aCsKYeDwL._SX326_BO1,204,203,200_.jpg',
        plot: 'It is a 1986 horror novel by American author Stephen King. It was his 22nd book, and his 17th novel written under his own name. The story follows the experiences of seven children as they are terrorized by an evil entity that exploits the fears of its victims to disguise itself while hunting its prey.'
    }, {
        id: 3,
        name: 'Clean Code',
        author: 'Robert Cecil Martin',
        image: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/1323/9780132350884.jpg',
        plot: 'A clean code should be elegant, efficient, readable, simple, without duplications, and well-written. You should add value to the business with your code. Clean code offers quality and understanding when we open a class. It is necessary that your code is clean and readable for anyone to find and easily understand.'
    }]

if (!window.localStorage.getItem('books')) {
    window.localStorage.setItem('books', JSON.stringify(books))
}