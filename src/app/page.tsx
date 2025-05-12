// import Image from "next/image";
"use client"
import StartQuiz from "@/components/Button";
import DropOptions from "@/components/DropDownOptions";
import { useQuizConfig } from "./store";

export default function Home() {

  const quizConfig = useQuizConfig(state=>state.config);
  const addQuestionNumber=useQuizConfig(state=>state.addQuestionNumber);

  // console.log(quizConfig);
  return (
    <section className="flex flex-col justify-center items-center my-10">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Quiz Time ...</h1>
        <section className="my-10 p-10 rounded-lg shadow-xl w-[75%]">
        <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number Of Questions</label>
            <input type="number" onChange={(e) => addQuestionNumber(e.target.value)} defaultValue={quizConfig.numberOfQuestion?quizConfig.numberOfQuestion:'10'} max={50} min={0} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
        <div className="flex flex-col items-center justify-center">
      <DropOptions />
      <StartQuiz />
      </div>

        </section>
    </section>
  );
}
