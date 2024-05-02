import React, { useState } from "react";
import { Faq, IFaq } from "../models/faq";

const Accordion = () => {
    const faqs: Array<IFaq> = [
        new Faq("What is a dog?", "A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world."),
        new Faq("What is a cat?", "A cat is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world."),
        new Faq("What is a bird?", "A bird is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.")
    ];

    const [activeIndex, setActiveIndex] = useState<number>(-1);

    const handleAccordion = (index: number) => {
        if (activeIndex === index)
            setActiveIndex((i)=> i = -1);
        else
            setActiveIndex((i) => i = index);
    };

    return (
        <div className="accordion">
            {faqs.map((faq, index) => (
                <div key={index}>
                    <button onClick={() => handleAccordion(index)}>{faq.question}</button>
                    {activeIndex === index && (
                        <div className="answer">{faq.answer}</div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Accordion;
