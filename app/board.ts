import { Piece } from "./pieces";

export type BoardRow = number[]

export interface Board {
    width: number;
    height: number;
    bits: BoardRow[];
    clearLines: () => void;
    checkCollision: (piece: Piece) => boolean;
    commit: (piece: Piece) => void;
}

export class DefaultBoard implements Board {
    width: number;
    height: number;
    bits: BoardRow[];

    constructor() {
        this.width = 10;
        this.height = 21;
        this.bits = Array.from(Array(this.height))
            .map(() => Array.from(Array(this.width)).map(() => 0));
    }

    clearLines() {
        const completeRows = [];
        for (let row = this.height - 1; row >= 0; row--) {
            const empty = this.bits[row].some(n => n === 0);
            if (!empty) {
                completeRows.push(row + completeRows.length);
            }
        }
        completeRows.forEach(r => {
            for (let row = r; row > 0; row--) {
                this.bits[row] = this.bits[row - 1];    
            }
            this.bits[0] = Array.from(Array(this.width)).map(() => 0);
        });
    }

    checkCollision(piece: Piece) {
        for (let row = 0; row < piece.height; row++) {
            for (let col = 0; col < piece.width; col++) {
                if (row + piece.location.y > this.height - 1) {
                    return true;
                }
                if (col + piece.location.x > this.width - 1) {
                    return true;
                }
                if (piece.shape[row][col]) {
                    if (this.bits[row + piece.location.y][col + piece.location.x] !== 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    commit(piece: Piece) {
        for (let row = 0; row < piece.height; row++) {
            for (let col = 0; col < piece.width; col++) {
                if (piece.shape[row][col]) {
                    const boardRow = row + piece.location.y;
                    const boardCol = col + piece.location.x;
                    this.bits[boardRow][boardCol] = 8;//piece.shape[row][col];
                }
            }
        }
        this.clearLines();
    }
}