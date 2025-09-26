import { motion } from 'framer-motion'

const IntroScreen = ({onStart}) => {
  return (
    <div className='flex flex-col items-center justify-center h-fill gap-8'>
      <motion.h1 
        className='text-5xl font-bold text-yellow-400'
        initial={{ scale: 0 }}
        animate={{ scale: 1}}
        transition={{type: "spring", stiffness: 20}} 
      >
        🏓 3D Table Tennis
      </motion.h1>

      <motion.button 
        onClick={onStart}
        className="px-8 py-3 bg-blue-500 rounded-2xl text-xl font-semibold hover:bg-blue-600 shadow-lg"
        whileTap={{ scale: 0.9 }}
       >
        🎮 New Game
      </motion.button>
    </div>
  )
}

export default IntroScreen