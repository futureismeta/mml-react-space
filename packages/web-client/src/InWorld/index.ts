import {HistoryItem, InworldClient, InworldPacket, Capabilities} from "@inworld/web-core";
import {InworldConnectionService} from "@inworld/web-core/build/src/services/inworld_connection.service";
import axios from 'axios';

// const API_URL = "https://api.inworld.ai/studio/v1";
const API_URL = "localhost:4000";

class Inworld {
    private client: InworldClient<InworldPacket, HistoryItem>;
    private connection: InworldConnectionService<InworldPacket>;

    constructor() {
        this.client = new InworldClient();
    }

    public async connect() {
        this.client.setUser({
            id: 'user-id',
            fullName: 'FirstName LastName',
        });

        let config = {
            capabilities: {
                emotions: true
            },

            connection: {
                autoReconnect: true,
                disconnectTimeout: 10 * 1000,
                // gateway: {
                //     hostname: 'localhost:4000',
                //     ssl: false,
                // },
                // audioPlayback: {
                //     sampleRate: 44100,
                //     stop: {
                //         duration: 1000,
                //         ticks: 10,
                //     },
                // },
            }
        };


        this.client.setConfiguration(config);
        this.client.setScene('workspaces/default-uimr06nomssj2oa9q6wfiq/scenes/tai_kwun_historian');
        this.client.setGenerateSessionToken(this.generateSessionToken)

        this.connection = this.client.build();
    }


    private async generateSessionToken() {
        const response = await fetch("http://localhost:4000");

        return response.json();
    }

    // private async generateSessionToken(): Promise<any> {
    //     try {
    //         const response = await axios.get(API_URL, {
    //             headers: {
    //                 'Authorization': `Bearer Q2JrMHY5Wnl5aHhZYVU3MUdXVEgwbllyWnVaNERINng6MlR3MFJTalM0aU53cEFMY1JpTVAxeUFsbDg4cGlxUnVZRmVhUmlLZmR2WFk2dHVKWEhYU2pGRUJnUXFLZEtDSA==`,  // Replace YOUR_ACCESS_TOKEN with your actual token
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //
    //         return response.data;
    //     } catch (error) {
    //         console.error("Error generating session token:", error);
    //
    //
    //         console.log(error)
    //
    //         throw error;
    //     }
    // }


    public async getCharacters() {
        const characters = await this.connection.getCharacters();

        // find a character
        const character = characters.find((character) => character.displayName === "The historian");

        if (!character) {
            console.log('No character found')
            return;
        }

        await this.connection.setCurrentCharacter(character);

        this.connection.getCurrentCharacter().then((character) => {
            console.log(character);
        })
    }

    async fetchVoiceResponse() {

        await this.connect()

        return await this.connection.sendText('Hello there how are you');
    }
}

export default Inworld;