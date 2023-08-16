import { Board, BoardRow } from "./board";
import { COLORS } from "./colors";

export interface Location {
    x: number;
    y: number;
}

export interface Piece {
    board: Board;
    color: number;
    width: number;
    height: number;
    shape: BoardRow[];
    location: Location;
    drop: () => boolean;
    moveRight: () => void;
    moveLeft: () => void;
    rotateRight: () => void;
    rotateLeft: () => void;
}

abstract class MovingPiece implements Piece {
    abstract board: Board;
    abstract color: number;
    abstract width: number;
    abstract height: number;
    abstract shape: BoardRow[];
    abstract location: Location;
    abstract rotateRight(): void;
    abstract rotateLeft(): void;

    static copy(piece: Piece) {
        const copy = new Box(piece.board);
        copy.location = { ...piece.location };
        copy.shape = piece.shape;
        copy.width = piece.width;
        copy.height = piece.height;
        return copy;
    }

    drop() {
        const copy = MovingPiece.copy(this);
        copy.location.y = copy.location.y + 1;
        if (!this.board.checkCollision(copy)) {
            this.location = copy.location;
            return false;
        } else {
            this.board.commit(this);
            return true;
        }
    }
    moveSideways(amount: number) {
        const copy = MovingPiece.copy(this);
        copy.location.x = copy.location.x + amount;
        if (!this.board.checkCollision(copy)) {
            this.location = copy.location;
        }
    }
    moveRight() {
        this.moveSideways(1);
    }
    moveLeft() {
        this.moveSideways(-1);
    }
}

const calculateInitiaLocation = (board: Board, width: number) => {
    const offset = Math.round(width / 2) - 1;
    return {
        x: Math.trunc(board.width / 2) - offset,
        y: 0
    };
}

export class Box extends MovingPiece {
    board: Board;
    color: number = 5;
    width: number = 2;
    height: number = 2;
    shape: BoardRow[];
    location: Location;

    constructor(board: Board) {
        super();
        this.board = board;
        this.shape = [
            Array.from(Array(2)).map(() => this.color),
            Array.from(Array(2)).map(() => this.color)
        ];
        this.location = calculateInitiaLocation(board, this.width);
    }
    
    rotateRight() {}
    rotateLeft() {}
}

export class Stick extends MovingPiece {
    board: Board;
    color: number = 2;
    width: number = 1;
    height: number = 4;
    shape: BoardRow[];
    location: Location;

    constructor(board: Board) {
        super();
        this.board = board;
        this.shape = [
            Array.from(Array(1)).map(() => this.color),
            Array.from(Array(1)).map(() => this.color),
            Array.from(Array(1)).map(() => this.color),
            Array.from(Array(1)).map(() => this.color)
        ];
        this.location = calculateInitiaLocation(board, this.width);
    }

    rotateRight(): void {
        throw new Error("Method not implemented.");
    }
    rotateLeft(): void {
        throw new Error("Method not implemented.");
    }
    
}

export class LForward extends MovingPiece {
    board: Board;
    color: number = 1;
    width: number = 2;
    height: number = 3;
    shape: BoardRow[];
    location: Location;

    constructor(board: Board) {
        super();
        this.board = board;
        this.shape = [
            [this.color, 0],
            [this.color, 0],
            [this.color, this.color]
        ];
        this.location = calculateInitiaLocation(board, this.width);
    }

    rotateRight(): void {
        throw new Error("Method not implemented.");
    }
    rotateLeft(): void {
        throw new Error("Method not implemented.");
    }
    
}

export class LBackward extends MovingPiece {
    board: Board;
    color: number = 3;
    width: number = 2;
    height: number = 3;
    shape: BoardRow[];
    location: Location;

    constructor(board: Board) {
        super();
        this.board = board;
        this.shape = [
            [0, this.color],
            [0, this.color],
            [this.color, this.color]
        ];
        this.location = calculateInitiaLocation(board, this.width);
    }

    rotateRight(): void {
        throw new Error("Method not implemented.");
    }
    rotateLeft(): void {
        throw new Error("Method not implemented.");
    }
    
}

export class SForward extends MovingPiece {
    board: Board;
    color: number = 4;
    width: number = 2;
    height: number = 3;
    shape: BoardRow[];
    location: Location;

    constructor(board: Board) {
        super();
        this.board = board;
        this.shape = [
            [this.color, 0],
            [this.color, this.color],
            [0, this.color],
        ];
        this.location = calculateInitiaLocation(board, this.width);
    }

    rotateRight(): void {
        throw new Error("Method not implemented.");
    }
    rotateLeft(): void {
        throw new Error("Method not implemented.");
    }
    
}

export class SBackward extends MovingPiece {
    board: Board;
    color: number = 6;
    width: number = 2;
    height: number = 3;
    shape: BoardRow[];
    location: Location;

    constructor(board: Board) {
        super();
        this.board = board;
        this.shape = [
            [0, this.color],
            [this.color, this.color],
            [this.color, 0],
        ];
        this.location = calculateInitiaLocation(board, this.width);
    }

    rotateRight(): void {
        throw new Error("Method not implemented.");
    }
    rotateLeft(): void {
        throw new Error("Method not implemented.");
    }
    
}


export class Tee extends MovingPiece {
    board: Board;
    color: number = 7;
    width: number = 3;
    height: number = 2;
    shape: BoardRow[];
    location: Location;

    constructor(board: Board) {
        super();
        this.board = board;
        this.shape = [
            [this.color, this.color, this.color],
            [0, this.color, 0],
        ];
        this.location = calculateInitiaLocation(board, this.width);
    }

    rotateRight(): void {
        throw new Error("Method not implemented.");
    }
    rotateLeft(): void {
        throw new Error("Method not implemented.");
    }
    
}