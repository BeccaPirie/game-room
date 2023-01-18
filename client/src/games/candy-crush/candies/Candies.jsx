export default function Candies({index, colour, dragStart, dragDrop, dragEnd, isPlaying}) {
    return(
        <img
            key={index}
            src={colour}
            alt={colour}
            id={index}
            draggable={isPlaying}
            onDragOver={e => e.preventDefault()}
            onDragEnter={e => e.preventDefault()}
            onDragLeave={e => e.preventDefault()}
            onDragStart={dragStart}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
        />
    )
}