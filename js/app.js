
const customForm = document.querySelector('.custom-form');
const noOfQuestions = document.querySelector('#number');
const category = document.querySelector('#category');
const difficulty = document.querySelector('#difficulty');
const type = document.querySelector('#type');

let resultArr = [];
let step = 0;

const checkAnswerHandle = (e, correct_answer) =>{
    console.log(correct_answer);
    if(e.target.value === correct_answer){
        e.target.classList = 'item correct'
        
    }else{
        e.target.classList = 'item wrong'
    }

}
const  shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

const renderToUi = (questionObj) =>{
    const questionContainer = document.querySelector('.questions-container')
    console.log(questionObj);
    customForm.style.display = 'none'
    questionContainer.style.display = 'block'
    const {question, correct_answer, incorrect_answers} = questionObj;
    const randomizedArr = shuffle([...incorrect_answers, correct_answer]);
    questionContainer.innerHTML = `<p>${question}</p>
    <ul className='list'>
        <li class='item'>${randomizedArr[0]}</li>
        <li class='item'>${randomizedArr[1]}</li>
        <li class='item'>${randomizedArr[2]}</li>
        <li class='item'>${randomizedArr[3]}</li>
    </ul>`
    console.log(correct_answer);
    const items = document.querySelectorAll('.item')
    items.forEach(item =>{
        item.addEventListener('click', e =>{
            checkAnswerHandle(e, correct_answer)
        })
    })

}

const fetchData = (question=10,diff='easy',cat=9,typ='multiple') =>{
    // console.log(question, diff,cat,typ);
    axios.get(`https://opentdb.com/api.php?amount=${+question}&category=${+cat}&difficulty=${diff}&type=${typ}`)
    .then(res =>{
        resultArr = res.data.results
        renderToUi(resultArr[0])
    })
    .catch(err => {
        console.log(err);
    })

}




customForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    let noOfQuestionsValue = noOfQuestions.value;
    let categoryValue = category.value;
    let difficultyValue = difficulty.value;
    let typeValue = type.value;

    if(noOfQuestionsValue && categoryValue && difficultyValue && typeValue){
        fetchData(noOfQuestionsValue,difficultyValue,categoryValue, typeValue);
    }else{
        fetchData();
    }


})