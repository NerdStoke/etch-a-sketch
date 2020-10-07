from raspiGPIOext.motors.stepper import Stepper_ROHS_28BYJ48
from threading import Thread
import sys

left = float(sys.argv[1])
rght = float(sys.argv[2])

left = left if abs(left) <= 360. else (360. if left > 0 else -360.)
rght = rght if abs(rght) <= 360. else (360. if rght > 0 else -360.)

def run_stepper(pins,angle,speed):
    Stepper_ROHS_28BYJ48(pins).move_by_angle(angle=angle,speed=speed)

Thread(target=run_stepper, args=([12,16,20,21],left,3.5)).start()
Thread(target=run_stepper, args=([4,17,27,22],rght,3.5)).start()