import { Request, Response } from 'express';

export class FloodArea {
  get = (req: Request, res: Response) => {
    const body = req.body;
    console.log('body: ', body);

    return res.status(200).json({
      message: 'Flood area received successfully!',
      body: body,
    });
  };

  send = (req: Request, res: Response) => {
    const body = req.body;
    console.log('body: ', body);

    return res.status(200).json({
      message: 'Flood area received successfully!',
      body: body,
    });
  };

  updated = (req: Request, res: Response) => {
    const body = req.body;
    console.log('body: ', body);

    return res.status(200).json({
      message: 'Flood area updated successfully!',
      body: body,
    });
  };

  delete = (req: Request, res: Response) => {
    const body = req.body;
    console.log('body: ', body);

    return res.status(200).json({
      message: 'Flood area deleted successfully!',
      body: body,
    });
  };
}
