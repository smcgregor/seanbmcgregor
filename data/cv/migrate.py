# Open each of the CV-related files
from os import walk

def migrate(dirpath, filename):

    if filename.split(".")[1] != "md":
        print("skipping {}".format(filename))
        return

    print("################# Migrating {}/{} #################\n\n".format(dirpath, filename))

    with open("{}/{}".format(dirpath, filename)) as f:
        outpath = "{}/{}x".format(dirpath, filename)
        with open(outpath, "w") as outfile:
            header_ended = False
            outfile.write("---\n")
            for line in f:
                if line == "\n" and not header_ended:
                    header_ended = True
                    outfile.write("---")
                line = line.replace("\"", "\\\"")
                filetypes = ["slides: ", "paper: ", "poster: "]
                for filetype in filetypes:
                    if not header_ended and filetype in line:
                        tok = line.split(filetype)
                        if "https://" in tok[1]:
                            line = ("{}{}".format(filetype, tok[1]))
                        else:
                            line = ("{}{}{}".format(filetype, "/static", tok[1]))
                if not header_ended and "title: " in line:
                    line = "title: \"{}\"".format(line.strip().split(" ", 1)[1])
                if not header_ended and "bibtex: " in line:
                    line = "bibtex: \"{}\"".format(line.strip().split(" ", 1)[1])
                if not header_ended and "bibtek: " in line:
                    line = "bibtex: \"{}\"".format(line.strip().split(" ", 1)[1])
                if not header_ended and "citation: " in line:
                    line = "citation: \"{}\"".format(line.strip().split(" ", 1)[1])
                if not header_ended and "year: " in line:
                    line = "year: \"{}\"".format(line.strip().split(" ", 1)[1])
                outfile.write(line.strip() + "\n")

f = []
for (dirpath, dirnames, filenames) in walk('.'):
    for filename in filenames:
        migrate(dirpath, filename)
