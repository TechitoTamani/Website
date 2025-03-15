
def Qex(section):

  import random

  namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]

  qu = ["name วิ่งด้วยความเร็วต้น u m/s มีความเร่ง a m/s^2 อีก t วินาที name จะมีความเร็วเท่าใด",
        "name เริ่มวิ่งจากหยุดนิ่งโดยมีความเร่ง a m/s^2 ผ่านไป t วินาที name จะเคลื่อนที่ได้ระยะทางเท่าไร",
        "name วิ่งโดยมีความเร็วต้น u m/s และมีความเร่ง a m/s^2 ผ่านไป t วินาที name จะเคลื่อนที่ได้ระยะทางเท่าไร"]

  # QuestionCode

  TypeNum = random.randint(0,(len(qu)-1))
  question = ((qu[TypeNum]).split())
  name = namelist[random.randint(0,(len(namelist)-1))]

  u = random.randint(1,10)
  a = random.randint(1,10)
  t = random.randint(1,10)
  s = random.randint(1,10)

  for i in range (len(question)) :
      if question[i] == "name":
          question[i] = name
      elif question[i] == "u":
          question[i] = u
      elif question[i] == "a":
          question[i] = a
      elif question[i] == "t":
          question[i] = t
      elif question[i] == "s":
          question[i] = s


  # AnsCode

  if  TypeNum == 0:
    Ans = u+(a*t)

  elif  TypeNum == 1:
    Ans = (1/2)*(a*(t**2))

  elif  TypeNum == 2:
    Ans = (u*t)+((1/2)*(a*(t**2)))


  # RandomAnsCode

  choice = [Ans]

  choiceAmount = 4

  MinusPlusType = [1,2,5,10,20]

  Num = random.randint(0,(len(MinusPlusType)-1))

  if Ans % 5 != 0:
     Num = random.randint(0,1)

  while len(choice) < choiceAmount :

    WrongChoice = choice[random.randint(0,(len(choice)-1))]+(MinusPlusType[Num]*((-1)**(random.randint(0,1))))

    if WrongChoice not in choice and WrongChoice > 0 :
      choice.append(WrongChoice)


  # PrintCode

  print(f"{section})",end=' ')

  for i in question :
    print(i,end=' ')

  print('')

  choice.sort()

  for j in range (choiceAmount):
    print((j+1),end=' ')
    print(int(choice[j]))

  Answer = str(input("Your Answer: "))

  if int(Answer) > choiceAmount :
    print("Stupid-_-")
    return(0)

  elif choice[int(Answer)-1] == Ans :
    print("Collect!!!!!!")
    return(1)

  else :
    print("Wrong....")
    return(0)
