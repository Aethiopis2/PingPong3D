import { motion } from 'framer-motion'

const SideSelection = ({onSelect}) => {
  return (
    <div className='flex flex-col h-full items-center justify-center gap-10'>
      <h2 className="text-3xl font-bold">Choose Your Side</h2>

      <div className="flex gap-10">
        <motion.button
          onClick={() => onSelect("red")}
          className='px-6 py-3 bg-red-500 rounded-xl text-lg hover:bg-red-600 shadow-lg'
          whileTap={{scale: 0.9}} 
        >
          🔴 Red Racket
        </motion.button>

        <motion.button
          onClick={() => onSelect("blue")}
          className='px-6 py-3 bg-blue-500 rounded-xl text-lg hover:bg-blue-600 shadow-lg'
          whileTap={{scale: 0.9}} 
        >
          🔵 Blue Racket
        </motion.button>
      </div>
    </div>
  )
}

export default SideSelection