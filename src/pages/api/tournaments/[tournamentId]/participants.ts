import type { NextApiRequest, NextApiResponse } from "next";

import { serverApi, serverRoutes } from "@/services/api-base";
import {
  getAllParticipantsParams,
  getAllParticipantsResponse,
} from "@/services/tournaments/participants/get-all";
import { handleError } from "@/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { tournamentId } = req.query;

  if (!tournamentId || typeof tournamentId !== "string") {
    return res.status(400).json({
      statusCode: 400,
      message: "Tournament ID is required",
    });
  }

  try {
    if (req.method === "GET") {
      const params = await getAllParticipantsParams.parseAsync(req.query);
      const response = await serverApi.get(
        serverRoutes.tournaments.participants.getAll(tournamentId),
        { params }
      );
      const data = await getAllParticipantsResponse.parseAsync(response.data);
      return res.status(200).json(data);
    }

    // if (req.method === "DELETE") {
    //   const params = await deleteTournamentParams.parseAsync(req.query);
    //   const response = await serverApi.delete(
    //     serverRoutes.tournaments.delete(params.id)
    //   );
    //   return res.status(200).json(response.data);
    // }

    return res
      .status(405)
      .json({ statusCode: 405, message: `Method [${req.method}] Not Allowed` });
  } catch (e) {
    return handleError(e, res);
  }
};

export default handler;
