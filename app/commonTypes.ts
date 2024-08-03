export interface Question {
 _id: string | number;  // Update this line
 visited: boolean;
 attempted: boolean;
 userOption: number;
 options: string[];
 img?: string;
 category: string;
 type: string;
 difficulty: string;
 question: string;
 correct_answer: string;
 incorrect_answers: string[];
}
