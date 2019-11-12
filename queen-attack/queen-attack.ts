export default class QueenAttack {
    black: [number, number];
    white: [number, number];

    private isPosition = (piece: [number, number]): boolean => 
        (piece[0] > -1 && piece[0] < 8) &&
        (piece[1] > -1 && piece[1] < 8);

    private areEqualQueens(black:[number, number], white:[number, number]) :boolean{
        return black.every((val, ind) => val === white[ind]);
    }

    private areCorrectDimension = (piece: [number, number]): boolean => 
        piece.length == 2;

    private moveUpperLeft  =  (piece: [number, number]): [number, number] =>
        [piece[0] - 1, piece[1] - 1];

    private moveUpperRight   =  (piece: [number, number]): [number, number] =>
        [piece[0] + 1, piece[1] - 1];

    private moveLowerLeft    =  (piece: [number, number]): [number, number] =>
        [piece[0] - 1, piece[1] + 1];    

    private moveLowerRight    =  (piece: [number, number]): [number, number] =>
        [piece[0] + 1, piece[1] + 1];

    private notOutsideUpperLeft  =  (piece: [number, number]): boolean =>
        piece[0] > -1 &&  piece[1] > -1;

    private notOutsideUpperRight   =  (piece: [number, number]): boolean =>
        piece[0] < 8 &&  piece[1] > -1;   
        
    private notOutsideLowerLeft   =  (piece: [number, number]): boolean =>
        piece[0] > -1 &&  piece[1] < 8; 

    private notOutsideLowerRight   =  (piece: [number, number]): boolean =>
        piece[0] < 8 &&  piece[1] < 8;  
        
    private canAttackDiagonal(black:[number, number], white:[number, number],
         moveFunction:(piece: [number, number]) => [number, number],
         notOutsideFunction :(piece: [number, number]) => boolean)
    {
        let found = false;
        black = moveFunction(black);
        while(notOutsideFunction(black)&&!found)
        {
            if(this.areEqualQueens(black, white))
            {
                found = true
            }
            black = moveFunction(black);
        }
        return found;
    }
    
    private canAttackRow = (black:[number, number], white:[number, number]) :boolean =>
        black[0] === white[0];
    
    private canAttackCol = (black:[number, number], white:[number, number]) :boolean =>
        black[1] === white[1];

    constructor(positioning:any) { 
        if(!this.areCorrectDimension(positioning.black))
            throw new Error('it is incorrect the dimensions of black queen');
        if(!this.areCorrectDimension(positioning.white))
            throw new Error('it is incorrect the dimensions of white queen');
        if (this.areEqualQueens(positioning.black, positioning.white))
            throw new Error('Queens cannot share the same space');
        if (!this.isPosition(positioning.black))
            throw new Error('Black tuples incorrect');
        if (!this.isPosition(positioning.white))
            throw new Error('white tuples incorrect');

        this.black = positioning.black; 
        this.white = positioning.white; 
     }  

    public canAttack():boolean{
        let isAttack = this.canAttackRow(this.black, this.white);
        isAttack = isAttack || this.canAttackCol(this.black, this.white);
        isAttack = isAttack || this.canAttackDiagonal(this.black, this.white,
            this.moveUpperLeft, this.notOutsideUpperLeft);
        isAttack = isAttack || this.canAttackDiagonal(this.black, this.white,
            this.moveUpperRight, this.notOutsideUpperRight);
        isAttack = isAttack || this.canAttackDiagonal(this.black, this.white,
            this.moveLowerLeft, this.notOutsideLowerLeft)    
        return  isAttack || this.canAttackDiagonal(this.black, this.white,
            this.moveLowerRight, this.notOutsideLowerRight);
    }

    public toString = () : string => {
        let board:string[] = [];
        for (let i = 0; i < 8; i++) {
            let row:string[]  = [];
            for (let j = 0; j < 8; j++) {
                if((i == this.black[0]) && (j == this.black[1]))
                    row.push("B");
                else if ((i == this.white[0]) && (j == this.white[1]))
                    row.push("W");
                else
                    row.push("_");
            }
            board.push(row.join(' '));
        }
        board[board.length-1] += "\n";
        return board.join("\n");
    }
}
  