const convict = require('convict')
const path = require('path')

const config = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['dev'],
    default: 'dev',
    env: 'NODE_ENV',
    arg: 'env'
  },
  server: {
    port: {
      doc: 'HTTP port to bind',
      format: 'Number',
      default: 5003
    },
    timeout: {  
      doc: 'Server Timeout',
      format: 'Number',
      default: 60000
    },
    enableHttpLogging: {
      doc: 'Enable HTTP Logging',
      format: Boolean,
      default: true
    },
    enableCompression: {
      doc: 'Enable HTTP compression',
      format: Boolean,
      default: true
    },
    bodyParser: {
      limit: {
        doc: 'maximum request body size',
        format: String,
        default: '100kb'
      }
    }
  },
  mysql: {
    host: {
      doc: 'Holds the SQL Server Host',
      format: String,
      default: 'localhost'
    },
    port: {
      doc: 'Holds the SQL Server Port',
      format: Number,
      default: 3306
    },
    username: {
      doc: 'Holds the SQL Server Username',
      format: String,
      default: 'root'
    },
    password: {
      doc: 'Holds the SQL Server Password',
      format: String,
      default: 'local'
    },
    database: {
      doc: 'Holds the Database In SQL Server',
      format: String,
      default: 'test'
    },
    dialect: {
      doc: 'Holds the Dialect Details That we are using for the Connection',
      format: String,
      default: 'mysql'
    },
    connectTimeout: {
      doc: 'Holds the Connection Timeout Time in ms',
      format: Number,
      default: 10000
    },
    pool: {
      max: {
        doc: 'Holds the Maximum SQL Pool Size',
        format: Number,
        default: 5
      },
      min: {
        doc: 'Holds the Minimum SQL Pool Size',
        format: Number,
        default: 0
      },
      acquire: {
        doc: 'Holds the Value for the time to Acquire the SQL Connection.',
        format: Number,
        default: 30000
      },
      idle: {
        doc: 'Holds the Idle Time for SQL To Reset the Connection.',
        format: Number,
        default: 10000
      }
    },
    dialectOptions: {
      multipleStatements: {
        doc: 'Whether to allow Multiple SQL Statements or not',
        format: Boolean,
        default: true
      }
    },
    logging: {
      doc: 'Whether Logging is Enabled or not',
      format: Boolean,
      default: false
    },
    operatorsAliases: {
      doc: 'Whether To Use Aliases For SQL Operations or not',
      format: Boolean,
      default: false
    }
  },
  logger: {
    httpLogFormat: {
      doc: 'HTTP log format',
      format: String,
      default: ':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] | :response-time ms ":referrer" ":user-agent"'
    },
    httpLogFileName: {
      doc: 'HTTP log File name',
      format: String,
      default: 'http.log'
    },
    logFileName: {
      doc: 'Log File name',
      format: String,
      default: 'logs.log'
    },
    exceptionLogFileName: {
      doc: 'Exception log File name',
      format: String,
      default: 'exceptions.log'
    },
    logFileSize: {
      doc: 'logs File Max File size',
      format: Number,
      default: 5242880
    },
    path: {
      doc: 'Holds the Log Path',
      format: String,
      default: './logs/'
    }
  }
})

config.loadFile(path.join(__dirname, '/config-' + config.get('env') + '.json'))

config.set('logger.httpLogFileName', config.get('logger.path') + config.get('logger.httpLogFileName'))
config.set('logger.logFileName', config.get('logger.path') + config.get('logger.logFileName'))
config.set('logger.exceptionLogFileName', config.get('logger.path') + config.get('logger.exceptionLogFileName'))

// validate
config.validate()

module.exports = config