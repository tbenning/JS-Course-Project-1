// A question is loaded from the data
// A user clicks a question, it loads the question from the object
// There are 4 or more answers loaded, one of which is correct

$(function() { 

// Question data to load 
    const questions = [
        {
            title: 'Title 1',
            prompt: 'This is the question body',
            answers: {
                a: "Option A1",
                b: "Option B",
                c: "Option C",
                d: "Option D",
                e: "Option E",
            },
            correctAnswer: "d",
        },
        {
            title: 'Title 2',
            prompt: 'This is the question body 2',
            answers: {
                a: "Option A2",
                b: "Option B",
                c: "Option C",
                d: "Option D"
            },
            correctAnswer: "b"
        },
        {
            title: 'Title 3',
            prompt: 'This is the question body 2',
            answers: {
                a: "Option A3",
                b: "Option B",
                c: "Option C",
                d: "Option D"
            },
            correctAnswer: "a"
        }];
   

    // Build questions
    function buildQuestions () {
        for (let thisQuestion in questions){   
            //Render out the heading and question 
            $('.questionContainer').append(`
                <div class="question-${thisQuestion}">
                <h1>${questions[thisQuestion].title}</h1>
                <p>${questions[thisQuestion].prompt}</p>
                <form action="" class="questionForm"></form>
                </div>
                `
            );

            // Make an array of answers for thisQuestion
            const answers = questions[thisQuestion].answers;

            //render out all the answers 
            for (answer in answers){
                $('.question-' + thisQuestion + ' .questionForm').append(`
                <label class="container">
                    <span class="answer">${answer} ${answers[answer]}</span>
                    <input type="radio" name="radio" value="${answer}">
                    <span class="checkmark"></span>
                </label>`
                )};

            //render out the button and close the form
            $(`.question-${thisQuestion} .questionForm`).append(`
                <button type="submit" class="submitButton">Check Answer</button>`
            );
        };
    }

    // Block regular submission behaviour
    // If its correct, it displays a message "Your answer is correct!"
    // If its incorrect, it displays a message "Your answer is incorrect, try again"

    function checkAnswer (event, thisQuestion) {
        //Prevent default behaviour
        event.preventDefault();
       
        // Assign the user answer from the input
        let userAnswer = $(`.question-${thisQuestion} input[name=radio]:checked`).val();

        // Assign the correct answer 
        const correctAnswer = questions[thisQuestion].correctAnswer;

        if (userAnswer == correctAnswer) {
            alert('Congrats! You have the correct answer!')
        } else {
            console.log("Incorrect answer");   
            console.log(`Correct aswe ${correctAnswer}`);
            console.log(`Chosen answer ${userAnswer}`);            
        }   
    } 

    buildQuestions();
    
    // Check the answer on submission
    // DRY!!!
    $('.question-0 form').on('submit', function () {
        checkAnswer(event, 0);
    });
    $('.question-1 form').on('submit', function () {
        checkAnswer(event, 1);
    });
    $('.question-2 form').on('submit', function () {
        checkAnswer(event, 2);
    });
    // Button becomes disabled 
    // User can select another answer, the button becomes active, and can submit again

    

});