import React, { useCallback, useEffect, useState } from "react";
import { BoardRow, DefaultBoard } from './board'
import { COLORS } from "./colors";

import { Piece, Box, Stick, LForward, LBackward, SBackward, SForward, Tee } from "./pieces";

const AVAILABLE_PIECES = [
    Box,
    Stick,
    LForward,
    LBackward,
    Tee,
    SForward,
    SBackward
];

const getRandomPiece = () => {
    const randomIndex = Math.trunc(Math.random() * AVAILABLE_PIECES.length);
    const pieceClass = AVAILABLE_PIECES[randomIndex];
    return pieceClass;
};

const Board = () => {
    const [board, setBoard] = useState(new DefaultBoard());
    const [bits, setBits] = useState(board.bits);
    const [currentPiece, setCurrentPiece] = useState<Piece|undefined>();
    const [updatedPiece, setUpdatedPiece] = useState<number|undefined>();
    const [mergedBits, setMergedBits] = useState<BoardRow[]|undefined>();
    
    useEffect(() => {
        document.getElementById('tetris-board')?.focus();
        const pieceClass = getRandomPiece();
        setCurrentPiece(new pieceClass(board));
    }, [board]);

    useEffect(() => {
        const mergedBits = Array.from(Array(board.height))
            .map((r, y) => Array.from(Array(board.width)).map((c, x) => bits[y][x]));
        if (currentPiece) {
            for (let row = 0; row < board.height; row++) {
                for (let col = 0; col < board.width; col++) {
                    // check current piece hitbox
                    if (row >= currentPiece.location.y && row < currentPiece.location.y + currentPiece.height &&
                        col >= currentPiece.location.x && col < currentPiece.location.x + currentPiece.width &&
                        currentPiece.shape[row - currentPiece.location.y][col - currentPiece.location.x]) {
                        mergedBits[row][col] = currentPiece.shape[row - currentPiece.location.y][col - currentPiece.location.x];
                    }
                }
            }
        }
        setMergedBits(mergedBits);
    }, [board, bits, currentPiece, updatedPiece]);

    const onKey = useCallback((e: any) => {
        if (!currentPiece) return;
        e.preventDefault();
        let finishedDrop = false;
        switch (e.keyCode) {
            case 37:
                currentPiece.moveLeft();
                break;
            case 39:
                currentPiece.moveRight();
                break;
            case 40:
                finishedDrop = currentPiece.drop();
                break;
            default:
                break;
        }
        setUpdatedPiece(Date.now());
        if (finishedDrop) {
            const pieceClass = getRandomPiece();
            setCurrentPiece(new pieceClass(board));
        }
    }, [currentPiece, board]);

    return (
        <div id="tetris-board" onKeyDown={onKey} tabIndex={0}>
            {mergedBits && mergedBits.map((row, y) => (
                <Row key={y}>
                    {row.map((bit, x) => <Bit key={x} value={bit} />)}
                </Row>
            ))}
        </div>
    );
};

const Row = (props: any) => {
    const { children } = props;
    return (
        <div className="flex flex-row">
            {children}
        </div>
    );
};

interface BitProps {
    value: number;
}
const Bit = (props: BitProps) => {
    const { value } = props;
    const style = {
        width: 24,
        height: 24,
        backgroundColor: COLORS[value] || 'transparent'
    };
    return (
        <div className="flex-1" style={style}/>
    )
}

export default Board;