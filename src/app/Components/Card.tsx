// import React from 'react';

// // Define the type for the props
// interface CardProps {
//   title: string; // Title of the card (e.g., "850k")
//   description: string; // Description of the card (e.g., "Employee")
//   backgroundColor?: string; // Optional background color (default: 'bg-green-50')
//   hoverEffect?: boolean; // Optional hover effect (default: true)
//   icon?: React.ReactNode;
// }

// const Card: React.FC<CardProps> = ({
//   title,
//   description,
//   icon,
//   backgroundColor = 'bg-white',
//   hoverEffect = true,
// }) => {
//   return (
//     <div
//       className={`border rounded-xl shadow-md ${backgroundColor} px-10 py-6 md:px-20 w-fit transition-all duration-300 ${
//         hoverEffect ? 'hover:shadow-lg hover:scale-105' : ''
//       }`}
//     >
//        <div className="flex flex-col items-center space-y-1">
//         {icon && <div className="text-4xl">{icon}</div>} 
//         <h1 className={`md:text-4xl text-2xl font-semibold `}>{title}</h1>
//         <p className={`font-medium `}>{description}</p>
//       </div>
//     </div>
//   );
// };

// export default Card;


import React from 'react'
interface CardsProps {
  name: string;

}

const Cards:React.FC<CardsProps> = (props)=> {
  return (
    <div className="relative border px-5 py-5 items-center flex  justify-center text-center rounded-lg shadow-xl bg-white/20
    w-full h-full max-w-[90%] sm:max-w-[300px] sm:h-auto lg:h-[120px] mx-auto hover:scale-105 transition-transform duration-300 ease-in-out">
  
  {/* Add a subtle decorative element */}
  <div className="absolute -top-3 -right-3 w-6 h-6 bg-white border-2 border-green-600 rounded-full shadow-md animate-bounce"></div>
  
  <h1 className="text-lg  md:text-lg lg:text-2xl font-semibold text-white drop-shadow-sm ">
    {props.name}
  </h1>
</div>

  )
}

export default Cards;