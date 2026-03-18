import { useMemo, memo } from 'react'

// Memoized MemoryCard component
const MemoryCard = memo(({ number, imageSrc }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-md bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
      {imageSrc ? (
        <picture className="block w-full h-full">
          <source srcSet={`${imageSrc}?w=300&q=75`} type="image/webp" />
          <img 
            src={imageSrc} 
            alt={`Memory ${number}`} 
            className="w-56 md:w-64 h-40 sm:h-48 md:h-56 object-cover object-center block"
            decoding="async"
            width="300"
            height="300"
          />
        </picture>
      ) : (
        <div className="w-56 md:w-64 h-40 sm:h-48 md:h-56 flex flex-col items-center justify-center overflow-hidden bg-gray-200">
          <div className="text-center flex-1 flex items-center justify-center">
            <svg className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500 font-medium text-sm">Upload Your Memory</p>
          </div>
        </div>
      )}
    </div>
  )
}, (prevProps, nextProps) => {
  return prevProps.imageSrc === nextProps.imageSrc && prevProps.number === nextProps.number
})

MemoryCard.displayName = 'MemoryCard'

const Memories = () => {
  // Create array of images for carousel (small set that loops efficiently)
  const memoryImages = useMemo(() => Array(8).fill(null), [])

  return (
    <section id="memories" className="section-padding bg-gradient-to-br from-pink-50 to-purple-50" aria-label="Onam Memories">
      {/* Carousel Animation Styles */}
      <style>{`
        @keyframes scrollLeftToRight {
          0% {
            transform: translateX(0) translateZ(0);
          }
          100% {
            transform: translateX(-50%) translateZ(0);
          }
        }

        .carousel-row-ltr {
          animation: scrollLeftToRight 20s linear infinite;
          transform: translateZ(0);
          will-change: transform;
        }

        .carousel-row-rtl {
          animation: scrollLeftToRight 20s linear infinite reverse;
          transform: translateZ(0);
          will-change: transform;
        }

        .carousel-container {
          overflow: hidden;
          position: relative;
          width: 100%;
          contain: layout style paint;
        }

        .carousel-track {
          display: flex;
          gap: 0.75rem;
          padding: 0.5rem;
          backface-visibility: hidden;
          transform: translateZ(0) translateX(0);
        }

        .carousel-track > div {
          flex-shrink: 0;
        }
      `}</style>

      <div className="max-w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 font-heading">
            Our Last Year Memories
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto px-4">
            Relive precious Onam moments and experiences
          </p>
        </div>

        {/* Carousel - First Row (Left to Right) */}
        <div className="carousel-container mb-4">
          <div className="carousel-track carousel-row-ltr">
            {/* Images 1-6 */}
            {Array(6).fill(null).map((_, index) => (
              <MemoryCard key={`row1-${index}`} number={index + 1} imageSrc={`/image${index + 1}.jpg`} />
            ))}
            {/* Images 1-3 for the loop pattern */}
            {Array(3).fill(null).map((_, index) => (
              <MemoryCard key={`row1-loop-${index}`} number={index + 1} imageSrc={`/image${index + 1}.jpg`} />
            ))}
            {/* Duplicate set for seamless infinite loop */}
            {/* Images 1-6 */}
            {Array(6).fill(null).map((_, index) => (
              <MemoryCard key={`row1-dup-${index}`} number={index + 1} imageSrc={`/image${index + 1}.jpg`} />
            ))}
            {/* Images 1-3 for the loop pattern */}
            {Array(3).fill(null).map((_, index) => (
              <MemoryCard key={`row1-dup-loop-${index}`} number={index + 1} imageSrc={`/image${index + 1}.jpg`} />
            ))}
          </div>
        </div>

        {/* Carousel - Second Row (Right to Left) */}
        <div className="carousel-container mb-6">
          <div className="carousel-track carousel-row-rtl" style={{ transform: 'translateX(0)' }}>
            {/* Images 7-11 and image 3 (from 1-6) */}
            {[7, 8, 9, 10, 11, 3].map((imageNum) => (
              <MemoryCard key={`row2-${imageNum}`} number={imageNum} imageSrc={`/image${imageNum}.jpg`} />
            ))}
            {/* Images 7-8 for the loop pattern */}
            {[7, 8].map((imageNum) => (
              <MemoryCard key={`row2-loop-${imageNum}`} number={imageNum} imageSrc={`/image${imageNum}.jpg`} />
            ))}
            {/* Duplicate set for seamless infinite loop */}
            {/* Images 7-11 and image 3 (from 1-6) */}
            {[7, 8, 9, 10, 11, 3].map((imageNum) => (
              <MemoryCard key={`row2-dup-${imageNum}`} number={imageNum} imageSrc={`/image${imageNum}.jpg`} />
            ))}
            {/* Images 7-8 for the loop pattern */}
            {[7, 8].map((imageNum) => (
              <MemoryCard key={`row2-dup-loop-${imageNum}`} number={imageNum} imageSrc={`/image${imageNum}.jpg`} />
            ))}
          </div>
        </div>


      </div>
    </section>
  )
}

export default Memories
