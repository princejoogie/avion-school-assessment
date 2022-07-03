import React from "react";

import { MatchWithParticipant } from "@/types";
import { Participant } from "@/services/tournaments/participants/common";

export interface MatchDetailsProps {
  match: MatchWithParticipant;
}

interface ItemContainerProps {
  player: Participant | null;
  score: string | null;
  isWinner: boolean;
}

const ItemContainer = ({ player, score, isWinner }: ItemContainerProps) => {
  return (
    <div className="border flex-1 h-full rounded">
      <div className="flex flex-col items-center p-4">
        {player?.participant.attached_participatable_portrait_url ? (
          <img
            className="h-12 w-12 mx-20 object-contain rounded-full"
            src={player?.participant.attached_participatable_portrait_url}
            alt={player?.participant.name}
          />
        ) : (
          <div className="uppercase h-12 w-12 mx-20 grid place-items-center rounded-full bg-gray-300">
            {player?.participant.name[0] ?? "?"}
          </div>
        )}

        <h6 className="text-gray-700 mt-2 text-sm w-full text-center">
          {player?.participant.name ?? (
            <span className="italic font-mono text-gray-500">
              To be determined
            </span>
          )}
        </h6>
      </div>

      <p
        className={`border-t w-full py-2 text-center font-bold text-lg ${
          isWinner ? "bg-blue-500 text-white" : "bg-gray-50 text-black"
        }`}
      >
        {/* eslint-disable-next-line no-extra-boolean-cast */}
        {!!score ? score : "N/A"}
      </p>
    </div>
  );
};

export const MatchDetails = ({ match }: MatchDetailsProps) => {
  const { winner_id } = match.match;
  const { player1, player2 } = match;

  const score = match.match.scores_csv.split("-");
  const player1Score = score?.[0] ?? null;
  const player2Score = score?.[1] ?? null;

  const player1Win = player1?.participant.id === winner_id;
  const player2Win = player2?.participant.id === winner_id;

  return (
    <div>
      <div>Showing Report Scores</div>

      <div className="flex mt-4">
        <ItemContainer
          player={player1}
          score={player1Score}
          isWinner={player1Win}
        />

        <p className="font-bold flex flex-col items-center justify-center mx-4">
          VS
        </p>

        <ItemContainer
          player={player2}
          score={player2Score}
          isWinner={player2Win}
        />
      </div>
    </div>
  );
};
