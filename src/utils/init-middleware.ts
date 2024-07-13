export default function initMiddleware (middleware: (arg0: any, arg1: any, arg2: (result: any) => void) => void) {
  return async (req: any, res: any) =>
    await new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}
