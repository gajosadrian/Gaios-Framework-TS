/** @noSelfInFile */

import { PlayerData } from './PlayerData'

const _player = player
const { remove } = table

const PLAYERS: Player[] = []
const PLAYERS_ID: Player[] = []

export class Player {
    private x: number = 0
    private y: number = 0

    public data: PlayerData

    constructor(public id: PlayerID) {
        this.init(id)

        // this.data = PlayerData.getInstance()
    }

    static add(id: PlayerID) {
        if (PLAYERS_ID[id]) PLAYERS_ID[id].remove()
        return new Player(id)
    }

    static remove(id: PlayerID) {
        Player.getInstance(id).remove()
    }

    static getInstance(id: PlayerID): Player {
        return PLAYERS_ID[id]
    }

    static getPlayers(type: PlayerValueTable = 'table'): Player[] {
        if (type == 'table') return PLAYERS

        const table = _player(0, type)
        const players: Player[] = []
        for (const i of forRange(0, table.length - 1)) {
            players[players.length] = this.getInstance(table[i])
        }
        return players
    }

    static getPlayersAlive(): Player[] {
        return Player.getPlayers('tableliving')
    }

    private init(id: PlayerID): void {
        this.id = id
        PLAYERS[PLAYERS.length] = this
        PLAYERS_ID[id] = this
    }

    private remove() {
        delete PLAYERS_ID[this.id]

        const index = PLAYERS.indexOf(this)
        remove(PLAYERS, index)
        
        this.id = 0
    }

    getX(precise: boolean = false) {
        if (precise) return _player(this.id, 'x')
        return this.x
    }

    getY(precise: boolean = false) {
        if (precise) return _player(this.id, 'y')
        return this.y
    }

    /** @tupleReturn */
    getPosition(precise: boolean = false): [number, number] {
        return [this.getX(precise), this.getY(precise)]
    }

    updatePosition() {
        this.x = this.getX(true)
        this.y = this.getY(true)
    }
}
