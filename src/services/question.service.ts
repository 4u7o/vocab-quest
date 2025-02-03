import type { AnswerDto, QuestionDto, TextDto, WordDto } from "database/dto";
import {
  AnswerRepository,
  QuestionRepository,
  TextRepository,
  WordRepository,
  DailyChallengeRepository,
} from "database/repositories";
import { shuffleArray } from "utils";

export class QuestionService {
  /**
   * Create Word, Question & Answer based on word (vocabulary)
   */
  static async createWordQuestion(
    wordParams: WordDto,
    questionParams: QuestionDto,
    answersParams: AnswerDto[],
  ) {
    const word = await WordRepository.create(wordParams);
    const question = await QuestionRepository.create({
      ...questionParams,
      wordId: word.id,
    });
    const answers = await AnswerRepository.bulkCreate(
      answersParams.map((answer) => ({
        ...answer,
        questionId: question.id,
      })),
    );

    return { word, question, answers };
  }

  /**
   * Create Text, Question & Answer based on text (reading,...)
   */
  static async createTextQuestion(
    textParams: TextDto,
    questionParams: QuestionDto,
    answersParams: AnswerDto[],
  ) {
    const text = await TextRepository.create(textParams);
    const question = await QuestionRepository.create({
      ...questionParams,
      textId: text.id,
    });
    const answers = await AnswerRepository.bulkCreate(
      answersParams.map((answer) => ({
        ...answer,
        questionId: question.id,
      })),
    );

    return { text, question, answers };
  }

  /**
   * Generate daily question for channel
   * @
   */
  static async generateDailyQuestion(activeDate: string) {
    // 1. Get old daily challenge for filtering duplicated questions.
    const oldQuestionIds = await DailyChallengeRepository.findManyAfterDate(activeDate);
    const oldQuestionIdArray = oldQuestionIds.map((question) => question.questionId);
    // 2. Get a random question from database
    const randomQuestion = await QuestionRepository.findOneRandomExclude(oldQuestionIdArray);
    const randomAnswers = await AnswerRepository.findManyByQuestion(randomQuestion);
    shuffleArray(randomAnswers);
    // 3. Return the question information.

    return {
      question: randomQuestion,
      answers: randomAnswers,
    };
  }
}
