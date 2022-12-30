import { useState } from "react"

export const useSlider = (length: number) => {
    const [currentId, setCurrentId] = useState(0)
    const [slideIn, setSlideIn] = useState(true)

    const nextExists = currentId + 1 < length
    const prevExists = currentId ? currentId - 1 < length : false

    const handleArrowClick = (direction: 'next' | 'prev') => {
        const newId = direction === 'next' ? currentId + 1 : currentId - 1

        setSlideIn(false)

        setTimeout(() => {
            setCurrentId(newId)
            setSlideIn(true)
        }, 300)
    }

    return {
        slideIn,
        index: currentId,
        isNext: nextExists,
        isPrev: prevExists,
        handleClick: handleArrowClick
    }
}