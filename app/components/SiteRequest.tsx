"useClient";

import React, { useState, useEffect } from "react";
import Modal from "react-modal";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	onSubmit?: () => void;
};

type Answer = {
	[key: string]: string;
};

type Question = {
	id: string;
	text: string;
};

const SiteRequestModal: React.FC<Props> = ({ isOpen, onClose }) => {
	const [answers, setAnswers] = useState<Answer>({});
	const [inputValue, setInputValue] = useState<string>("");
	const [step, setStep] = useState<number>(0);

	const questions: Question[] = [
		{ id: "yourName", text: "What is your name?" },
		{ id: "contactInfo", text: "Your contact information?" },
		{ id: "siteName", text: "Name of the site?" },
		{ id: "siteType", text: "Type and goal of the site?" },
		{ id: "budget", text: "Your budget for the site?" },
	];

	const handleNext = () => {
		setAnswers({ ...answers, [questions[step].id]: inputValue });
		setInputValue("");
		setStep((prevStep) => prevStep + 1);
	};

	const composeEmailLink = (): string => {
		const subject = encodeURIComponent("New Site Request");
		const body = encodeURIComponent(`
      Your Name: ${answers["yourName"] || ""}
      Contact Info: ${answers["contactInfo"] || ""}
      Site Name: ${answers["siteName"] || ""}
      Site Type and Goal: ${answers["siteType"] || ""}
      Budget: ${answers["budget"] || ""}
      // Add more answer fields as needed
    `);
		return `mailto:njwright92@gmail.com?subject=${subject}&body=${body}`;
	};

	useEffect(() => {
		const handleKeyPress = (e: { key: string }) => {
			if (e.key === "Enter" && step < questions.length) {
				handleNext();
			}
		};

		window.addEventListener("keydown", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, [step, handleNext]);

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			className="fixed inset-0 z-50 flex items-center justify-center"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			<div
				className={`relative z-50 bg-zinc-900 rounded-xl p-6 mx-auto text-center shadow-lg modal-content ${
					isOpen ? "open" : ""
				}`}
			>
				<button
					onClick={onClose}
					className="absolute top-2 right-2 shadow-md p-2 text-peachFuzz transition duration-150 ease-in-out" // Changed text color
					aria-label="Close"
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="3"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				<h1
					id="modal-title"
					className="mt-4 mb-4 text-xl font-bold text-zinc-300" // Changed color
				>
					Site Request!
				</h1>
				<h2 className="mb-4 text-md text-zinc-300">
					{" "}
					// Changed color I'm collecting information to understand your needs.
					Please answer the following questions.
				</h2>
				{step < questions.length ? (
					<>
						{/* Form for each question */}
						<>
							<label
								htmlFor={questions[step].id}
								className="block mb-2 text-lg text-zinc-300" // Changed color
							>
								<strong>{questions[step].text}</strong>
							</label>
							<textarea
								id={questions[step].id}
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								className="w-full p-2 mb-4 text-peachFuzz bg-zinc-900 border border-zinc-300 rounded-xl focus:border" // Changed text color
								rows={4}
								aria-describedby="response-feedback"
							/>
							<button
								onClick={handleNext}
								className="mt-4 px-6 py-3 bg-zinc-900 text-zinc-300 font-medium text-lg leading-none uppercase rounded-xl shadow-md hover:bg-zinc-800 focus:bg-zinc-800 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 active:bg-zinc-800 transition duration-150 ease-in-out border border-peachFuzz" // Changed text and border color
							>
								Next
							</button>
						</>
						{inputValue && (
							<p id="response-feedback" className="text-md text-zinc-300 mb-4">
								{" "}
								// Changed color Your response has been recorded.
							</p>
						)}
					</>
				) : (
					<>
						{/* Completion message and email link */}
						<h3 className="text-md font-semibold mb-4 text-zinc-300">
							{" "}
							// Changed color Thanks for answering the questions! Click the
							button below to email me your site request with the information
							you provided.
						</h3>
						<a
							className="mt-4 px-6 py-3 bg-zinc-900 text-zinc-300 font-medium text-lg leading-none uppercase rounded-xl shadow-md hover:bg-zinc-800 focus:bg-zinc-800 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 active:bg-zinc-800 transition duration-150 ease-in-out border border-peachFuzz" // Changed text and border color
							href={composeEmailLink()}
						>
							Send Request!
						</a>
					</>
				)}
			</div>
		</Modal>
	);
};

export default SiteRequestModal;
