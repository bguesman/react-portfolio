from PIL import Image
import os

directory = os.getcwd()

# Safeguard against running this in the wrong folder
if not directory.endswith("public\img"):
    print("Failed, can only be run from public\img")
    exit()

for (dirpath, dirnames, filenames) in os.walk(directory):
    for dir in dirnames:
        for file in os.listdir(dir):
            if file.endswith(".png"):
                print("Converting file " + file)
                # Open image
                im = Image.open(directory + "\\" + dir + "\\" + file)
                
                # Rename to jpg
                name = file.removesuffix(".png") + ".jpg"

                # Convert
                rgb_im = im.convert('RGB')

                # Save
                rgb_im.save(directory + "\\" + dir + "\\" + name)

                print("Done, saving as " + name)
            else:
                print("Skipping file " + file)

    # for dir in os.listdir(dirnames):
        # if filename.endswith(".jpg"):
        #     print(filename)
            # im = Image.open(filename)
            # name='img'+str(c)+'.png'
            # rgb_im = im.convert('RGB')
            # rgb_im.save(name)
            # c+=1
            # print(os.path.join(directory, filename))
        #     continue
        # else:
        #     continue